import axios from "axios";
import APIendpoint from "constants/constants";
import { RawMenuList, RawMenu } from "types";

export const getMenuList = (
  date: string,
  isExceptEmptyRestaurant: boolean,
  accessToken: string = "",
): Promise<{
  count: number;
  result: RawMenuList[];
}> => {
  const apiUrl = `${APIendpoint()}/menus${
    !!accessToken ? "" : "/web"
  }?start_date=${date}&end_date=${date}&except_empty=${isExceptEmptyRestaurant}`;
  const config = !!accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};

  return axios
    .get(apiUrl, config)
    .then((res) => {
      const {
        data: { count, result },
      } = res;
      return { count, result };
    })
    .catch((e) => {
      throw e;
    });
};

export const getMenu = (menuID: number, accessToken: string = ""): Promise<RawMenu> => {
  const apiUrl = `${APIendpoint()}/menus/${menuID}${!!accessToken ? "" : "/web"}`;
  const config = !!accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};

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

export const setMenuLike = (
  menuID: number,
  accessToken: string,
): Promise<{ isLiked: boolean; likeCount: number }> => {
  return axios
    .post(
      `${APIendpoint()}/menus/${menuID}/like`,
      {},
      { headers: { authorization: `Bearer ${accessToken}` } },
    )
    .then((res) => {
      const {
        data: { is_liked: isLiked, like_cnt: likeCount },
      } = res;
      return { isLiked, likeCount };
    })
    .catch((e) => {
      throw e;
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
      { headers: { authorization: `Bearer ${accessToken}` } },
    )
    .then((res) => {
      const {
        data: { is_liked: isLiked, like_cnt: likeCount },
      } = res;
      return { isLiked, likeCount };
    })
    .catch((e) => {
      throw e;
    });
};
