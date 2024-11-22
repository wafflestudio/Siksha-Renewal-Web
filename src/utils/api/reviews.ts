import axios from "axios";
import APIendpoint from "constants/constants";
import { RawReview } from "types";

export const getReviews = (
  menuID: number,
): Promise<{
  totalCount: number;
  hasNext: boolean;
  result: RawReview[];
}> => {
  return axios
    .get(`${APIendpoint()}/reviews/?menu_id=${menuID}&page=1&per_page=100`)
    .then((res) => {
      const {
        data: { total_count: totalCount, has_next: hasNext, result },
      } = res;
      return { totalCount, hasNext, result };
    });
};

export const setReview = (body: FormData, accessToken: string): Promise<void> => {
  return axios
    .post(`${APIendpoint()}/reviews/images`, body, {
      headers: {
        "authorization-token": `Bearer ${accessToken}`,
      },
    })
    .then(() => {})
    .catch((err) => {
      throw new Error(err);
    });
};

export const getReviewScore = (menuID: number): Promise<number[]> => {
  return axios
    .get(`${APIendpoint()}/reviews/dist?menu_id=${menuID}`)
    .then((res) => {
      const {
        data: { dist },
      } = res;
      return dist;
    })
    .catch((e) => {
      throw new Error(e);
    });
};
