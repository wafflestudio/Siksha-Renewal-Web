import axios from "axios";
import APIendpoint from "constants/constants";
import { RawReview } from "types";

export const getReviews = (
  menuID: number,
  accessToken?: string,
): Promise<{
  totalCount: number;
  hasNext: boolean;
  result: RawReview[];
}> => {
  const endpoint = accessToken ? "/reviews" : "/reviews/web";
  const config = accessToken ? { headers: { Authorization: `Bearer ${accessToken}` } } : {};

  const params = {
    menu_id: menuID,
    page: 1,
    size: 100,
    // Legacy Django param name; Spring will ignore it.
    per_page: 100,
  };

  const parse = (data: any) => {
    const totalCount = data?.totalCount ?? data?.total_count ?? 0;
    const hasNext = data?.hasNext ?? data?.has_next ?? false;
    const result = data?.result ?? [];
    return { totalCount, hasNext, result } as {
      totalCount: number;
      hasNext: boolean;
      result: RawReview[];
    };
  };

  return axios
    .get(`${APIendpoint()}${endpoint}`, { ...config, params })
    .then((res) => parse(res.data))
    .catch((e) => {
      const status = e?.response?.status;
      if (status !== 404) throw e;
      // Legacy endpoint (pre Spring): GET /reviews/?menu_id=...&page=...&per_page=...
      return axios
        .get(`${APIendpoint()}/reviews/`, { ...config, params })
        .then((res) => parse(res.data));
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
    .get(`${APIendpoint()}/reviews/me?page=${page}&per_page=${size}`, {
      headers: { "authorization-token": `Bearer ${accessToken}` },
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