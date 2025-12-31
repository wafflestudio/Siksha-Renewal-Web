import axios from "axios";
import APIendpoint from "constants/constants";
import { MyReviewGroupType, MyReviewType, RawReview } from "types";

export const getReviews = (
  menuID: number,
  accessToken?: string,
): Promise<{
  totalCount: number;
  hasNext: boolean;
  result: RawReview[];
}> => {
  const apiUrl = !!accessToken
    ? `${APIendpoint()}/reviews?menu_id=${menuID}&page=1&size=100`
    : `${APIendpoint()}/reviews/web?menu_id=${menuID}&page=1&size=100`;
  const config = !!accessToken ? { headers: { Authorization: `Bearer ${accessToken}` } } : {};
  return axios.get(apiUrl, config).then((res) => {
    const {
      data: { total_count: totalCount, has_next: hasNext, result },
    } = res;
    return { totalCount, hasNext, result };
  });
};

export const getReview = (reviewID: number, accessToken: string = ""): Promise<MyReviewType> => {
  const apiUrl = !!accessToken
    ? `${APIendpoint()}/reviews/${reviewID}`
    : `${APIendpoint()}/reviews/${reviewID}/web`;
  const config = !!accessToken ? { headers: { Authorization: `Bearer ${accessToken}` } } : {};
  return axios
    .get(apiUrl, config)
    .then((res) => {
      const { data } = res;
      return data;
    })
    .catch((e) => {
      throw e;
    });
};

export const setReview = (body: FormData, accessToken: string): Promise<void> => {
  return axios
    .post(`${APIendpoint()}/reviews/images`, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
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
  result: MyReviewGroupType[];
  totalCount: number;
  hasNext: boolean;
}> => {
  return axios
    .get(`${APIendpoint()}/reviews/me?page=${page}&perPage=${size}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
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
    .patch(`${APIendpoint()}/reviews/${reviewId}`, body, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then(() => {})
    .catch((e) => {
      throw e;
    });
};

export const deleteReview = (reviewId: number, accessToken: string) => {
  return axios
    .delete(`${APIendpoint()}/reviews/${reviewId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then(() => {})
    .catch((e) => {
      throw e;
    });
};
