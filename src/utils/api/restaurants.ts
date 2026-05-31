import axios from "axios";
import APIendpoint from "constants/constants";
import { Restaurant, RawRestaurant } from "types";

export const getRestaurantList = (): Promise<Restaurant[]> => {
  const parse = (rawData: RawRestaurant[]): Restaurant[] =>
    rawData.map((restaurant) => ({
      createdAt: restaurant.created_at,
      updatedAt: restaurant.updated_at,
      id: restaurant.id,
      code: restaurant.code,
      nameKr: restaurant.name_kr ?? restaurant.nameKr,
      nameEn: restaurant.name_en ?? restaurant.nameEn,
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
