import axios from "axios";
import APIendpoint from "constants/constants";
import { RawMenuList, RawMenu } from "types";

export const getMenuList = (
  date: string,
  isExceptEmptyRestaurant: boolean,
): Promise<{
  count: number;
  result: RawMenuList[];
}> => {
  return axios
    .get(
      `${APIendpoint()}/menus/?start_date=${date}&end_date=${date}&except_empty=${isExceptEmptyRestaurant}`,
    )
    .then((res) => {
      const {
        data: { count, result },
      } = res;
      return { count, result };
    })
    .catch((e) => {
      throw new Error(e);
    });
};

export const getMenu = (menuID: number): Promise<RawMenu> => {
  return axios
    .get(`${APIendpoint()}/menus/plain/${menuID}`)
    .then((res) => {
      const { data } = res;
      return data;
    })
    .catch((e) => {
      throw new Error(e);
    });
};

export const setMenuLike = (
  menuID: number,
  accessToken: string,
): Promise<{ isLiked: boolean; likeCount: number }> => {
  return axios
    .post(
      `${APIendpoint()}/menus/${menuID}/like`,
      {},
      { headers: { "authorization-token": `Bearer ${accessToken}` } },
    )
    .then((res) => {
      const {
        data: { is_liked: isLiked, like_cnt: likeCount },
      } = res;
      return { isLiked, likeCount };
    })
    .catch((e) => {
      throw new Error(e);
    });
};

export const setMenuUnlike = (
  menuID: number,
  accessToken: string,
): Promise<{ isLiked: boolean; likeCount: number }> => {
  return axios
    .post(
      `${APIendpoint()}/menus/${menuID}/unlike`,
      {},
      { headers: { "authorization-token": `Bearer ${accessToken}` } },
    )
    .then((res) => {
      const {
        data: { is_liked: isLiked, like_cnt: likeCount },
      } = res;
      return { isLiked, likeCount };
    })
    .catch((e) => {
      throw new Error(e);
    });
};
