import axios from "axios";
import APIendpoint from "constants/constants";
import { RawRestaurant } from "types";

export const getRestaurantList = (): Promise<{
  count: number;
  result: RawRestaurant[];
}> => {
  return axios
    .get(`${APIendpoint()}/restaurants/`)
    .then((res) => {
      const { data } = res;
      return data;
    })
    .catch((e) => {
      throw new Error(e);
    });
};
