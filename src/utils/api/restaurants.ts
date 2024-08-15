import axios from "axios";
import APIendpoint from "constants/constants";
import { Restaurant, RawRestaurant } from "types";
import { restaurantParser } from "utils/DataUtil";

export const getRestaurantList = (): Promise<{
  count: number;
  result: Restaurant[];
}> => {
  return axios
    .get(`${APIendpoint()}/restaurants/`)
    .then((res) => {
      const { count, result: rawData } = res.data;

      const data = rawData.map(restaurantParser);

      return {
        count: count,
        result: data,
      };
    })
    .catch((e) => {
      throw new Error(e);
    });
};
