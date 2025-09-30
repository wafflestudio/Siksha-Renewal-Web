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
    .get(`${APIendpoint()}/reviews?menu_id=${menuID}&page=1&per_page=100`)
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
        "Authorization": `Bearer ${accessToken}`,
      },
    })
    .then(() => {})
    .catch((e) => {
      throw e;
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
      throw e;
    });
};

export const getMyReviewList = (
  accessToken: string,
  size: number,
  page: number,
): Promise<{
  result: RawReview[];
  totalCount: number;
  hasNext: boolean;
}> => {
  return axios
    .get(`${APIendpoint()}/reviews/me?page=${page}&perPage=${size}`, {
      headers: { "Authorization": `Bearer ${accessToken}` },
    })
    .then((res) => {
      const {
        data: { result, total_count: totalCount, has_next: hasNext },
      } = res;
      return {
        result,
        totalCount,
        hasNext,
      };
    })
    .catch((e) => {
      throw e;
    });
};

export const updateReview = (reviewId: number, body: FormData, accessToken: string) => {
  return axios
    .put(`${APIendpoint()}/reviews/${reviewId}`, body, {
      headers: { "Authorization": `Bearer ${accessToken}` },
    })
    .then(() => {})
    .catch((e) => {
      throw e;
    });
};

export const deleteReview = (reviewId: number, accessToken: string) => {
  return axios
    .delete(`${APIendpoint()}/reviews/${reviewId}`, {
      headers: { "Authorization": `Bearer ${accessToken}` },
    })
    .then(() => {})
    .catch((e) => {
      throw e;
    });
};