import axios from "axios";
import APIendpoint from "constants/constants";
import { RawMenuList, RawMenu, LikedMenusResponse } from "types";

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
  const config = !!accessToken ? { headers: { Authorization: `Bearer ${accessToken}` } } : {};

  return axios
    .get(apiUrl, config)
    .then((res) => {
      const {
        data: { count, result: rawData },
      } = res;
      const result = rawData.map((menuList) => ({
        date: menuList.date,
        BR: menuList.br,
        LU: menuList.lu,
        DN: menuList.dn,
      }));
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
      { headers: { Authorization: `Bearer ${accessToken}` } },
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
      { headers: { Authorization: `Bearer ${accessToken}` } },
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

export const getLikedMenus = (accessToken: string): Promise<LikedMenusResponse> => {
  return axios
    .get(`${APIendpoint()}/menus/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      // Prevent indefinite pending requests (e.g., stalled browser connection pool).
      timeout: 10000,
    })
    .then((res) => {
      const { data } = res;
      return data;
    })
    .catch((e) => {
      // If endpoint doesn't exist yet, return empty result
      if (e.response?.status === 404 || e.response?.status === 501) {
        return { count: 0, result: [] };
      }
      throw e;
    });
};
