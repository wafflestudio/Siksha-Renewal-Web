import axios from "axios";
import APIendpoint from "constants/constants";

export const setInquiry = (voc: string, accessToken: string): Promise<void> => {
  return axios
    .post(
      `${APIendpoint()}/voc`,
      {
        voc,
        platform: "WEB",
      },
      {
        headers: { "authorization-token": `Bearer ${accessToken}` },
      },
    )
    .then(() => {})
    .catch((e) => {
      throw e;
    });
};
