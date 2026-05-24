import axios from "axios";
import APIendpoint from "constants/constants";
import { Restaurant, RawRestaurant } from "types";

export const patchRestaurantOrder = (accessToken: string, order: number[]): Promise<void> =>
  axios.patch(
    `${APIendpoint()}/restaurants/order`,
    { order },
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );

export const patchRestaurantLike = (accessToken: string, id: number, like: boolean): Promise<void> =>
  axios.patch(
    `${APIendpoint()}/restaurants/like/${id}`,
    { like },
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );

export const patchRestaurantVisible = (
  accessToken: string,
  id: number,
  visible: boolean,
): Promise<void> =>
  axios.patch(
    `${APIendpoint()}/restaurants/visible/${id}`,
    { visible },
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );

export const getPersonalRestaurantList = (accessToken: string): Promise<Restaurant[]> =>
  axios
    .get(`${APIendpoint()}/restaurants/personal`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((res) =>
      res.data.result.map((r: any): Restaurant => ({
        createdAt: r.created_at,
        updatedAt: r.updated_at,
        id: r.id,
        code: r.code,
        nameKr: r.nameKr,
        nameEn: r.nameEn ?? "",
        addr: r.addr,
        lat: r.lat,
        lng: r.lng,
        etc: r.etc,
        liked: r.liked,
        visible: r.visible,
      })),
    );

export const getRestaurantList = (): Promise<Restaurant[]> => {
  const parse = (rawData: RawRestaurant[]): Restaurant[] =>
    rawData.map((restaurant) => ({
      createdAt: restaurant.created_at,
      updatedAt: restaurant.updated_at,
      id: restaurant.id,
      code: restaurant.code,
      nameKr: restaurant.name_kr,
      nameEn: restaurant.name_en,
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
