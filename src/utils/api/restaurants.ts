import axios from "axios";
import APIendpoint from "constants/constants";
import { Restaurant, RawRestaurant } from "types";

export const getRestaurantList = (): Promise<{
  count: number;
  result: Restaurant[];
}> => {
  return axios
    .get(`${APIendpoint()}/restaurants/`)
    .then((res) => {
      const { data: rawData } = res;
      const data = rawData.map((restaurant: RawRestaurant) => ({
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
      return data;
    })
    .catch((e) => {
      throw new Error(e);
    });
};
