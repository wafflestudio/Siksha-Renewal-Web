import axios from "axios";
import APIendpoint from "constants/constants";
import { Restaurant, RawRestaurant } from "types";

export const getRestaurantList = (): Promise<Restaurant[]> => {
  // `/restaurants` 엔드포인트는 식당 이름을 camelCase(nameKr/nameEn)로 반환한다.
  // (`/menus`의 식당 데이터는 snake_case라 RawRestaurant와 함께 fallback으로 둔다.)
  const parse = (rawData: (RawRestaurant & Partial<Restaurant>)[]): Restaurant[] =>
    rawData.map((restaurant) => ({
      createdAt: restaurant.created_at,
      updatedAt: restaurant.updated_at,
      id: restaurant.id,
      code: restaurant.code,
      nameKr: restaurant.nameKr ?? restaurant.name_kr,
      nameEn: restaurant.nameEn ?? restaurant.name_en,
      addr: restaurant.addr,
      lat: restaurant.lat,
      lng: restaurant.lng,
      etc: restaurant.etc,
    }));

  return axios
    .get(`${APIendpoint()}/restaurants`)
    .then((res) => {
      const {
        data: { result: rawData },
      } = res;
      return parse(rawData);
    })
    .catch((e) => {
      const status = e?.response?.status;
      if (status !== 404) throw e;
      return axios.get(`${APIendpoint()}/restaurants/`).then((res) => parse(res.data.result));
    });
};
