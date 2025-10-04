import axios from "axios";
import APIendpoint from "constants/constants";
import { KeywordReviewScore, RawReview } from "types";

export const getReviews = (
  menuID: number,
): Promise<{
  totalCount: number;
  hasNext: boolean;
  result: RawReview[];
}> => {
  return axios.get(`${APIendpoint()}/reviews?menu_id=${menuID}&page=1&per_page=100`).then((res) => {
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
        authorization: `Bearer ${accessToken}`,
      },
    })
    .then(() => {})
    .catch((err) => {
      err.message = "리뷰 등록에 실패했습니다.";
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
      throw e;
    });
};

export const getKeywordReviewScore = (menuID: number): Promise<KeywordReviewScore> => {
  return axios
    .get(`${APIendpoint()}/reviews/keyword/dist?menu_id=${menuID}`)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      throw e;
    });
};

export const setReviewLike = (reviewId: number, accessToken: string): Promise<void> => {
  return axios
    .post(`${APIendpoint()}/reviews/${reviewId}/like`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
    .then(() => {})
    .catch((err) => {
      err.message = "리뷰 좋아요에 실패했습니다.";
      throw new Error(err);
    });
};

export const setReviewUnlike = (reviewId: number, accessToken: string): Promise<void> => {
  return axios
    .delete(`${APIendpoint()}/reviews/${reviewId}/like`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
    .then(() => {})
    .catch((err) => {
      err.message = "리뷰 좋아요 취소에 실패했습니다.";
      throw new Error(err);
    });
};
