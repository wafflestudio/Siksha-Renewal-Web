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
  const apiUrl = `${APIendpoint()}/menus?start_date=${date}&end_date=${date}&except_empty=${isExceptEmptyRestaurant}&is_private=${
    !!accessToken ? "true" : "false"
  }`;
  const config = !!accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};

  return axios
    .get(apiUrl, config)
    .then((res) => {
      const {
        data: { count, result: rawData },
      } = res;
      if (count === 0) {
        return {
          count: 0,
          result: [
            {
              date: date,
              BR: [],
              LU: [],
              DN: [],
            },
          ],
        };
      }
      const result = rawData.map((menuList) => ({
        date: menuList.date,
        BR: menuList.br || menuList.BR || [],
        LU: menuList.lu || menuList.LU || [],
        DN: menuList.dn || menuList.DN || [],
      }));
      return { count, result };
    })
    .catch((e) => {
      throw e;
    });
};

export const getMenu = (menuID: number, accessToken: string = ""): Promise<RawMenu> => {
  const apiUrl = `${APIendpoint()}/menus/${menuID}?is_private=${!!accessToken ? "true" : "false"}`;
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
