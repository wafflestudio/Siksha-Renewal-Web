import axios from "axios";
import APIendpoint from "constants/constants";

export const getFestivalDates = ()
  : Promise<{ festival_dates: String[] }> => {
  const apiUrl = `${APIendpoint()}/menus/festival/dates`;
  return axios
    .get(apiUrl)
    .then((res) => {
      const { data } = res;
      return data;
    })
    .catch((e) => {
      throw e;
    });
};

export const getIsFestival = (
  date: String
) : Promise<{ is_festival: boolean }> => {
  const apiUrl = `${APIendpoint()}/menus/festival/${date}`;
  return axios
    .get(apiUrl)
    .then((res) => {
      const { data } = res;
      return data;
    })
    .catch((e) => {
      throw e;
    });
};