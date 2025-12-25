import axios from "axios";
import APIendpoint from "constants/constants";
import { RawMenuList, RawMenu, LikedMenusResponse } from "types";
import { isMockToken, getMockLikedMenus, getMockMenuList } from "utils/mockAuth";

export const getMenuList = (
  date: string,
  isExceptEmptyRestaurant: boolean,
  accessToken: string = "",
): Promise<{
  count: number;
  result: RawMenuList[];
}> => {
  if (accessToken && isMockToken(accessToken)) {
    return Promise.resolve(getMockMenuList(date));
  }

  const config = !!accessToken ? { headers: { Authorization: `Bearer ${accessToken}` } } : {};

  const springUrl = !!accessToken
    ? `${APIendpoint()}/menus?start_date=${date}&end_date=${date}&except_empty=${isExceptEmptyRestaurant}`
    : `${APIendpoint()}/menus/web?start_date=${date}&end_date=${date}&except_empty=${isExceptEmptyRestaurant}`;

  const legacyUrl = !!accessToken
    ? `${APIendpoint()}/menus/lo?start_date=${date}&end_date=${date}&except_empty=${isExceptEmptyRestaurant}`
    : `${APIendpoint()}/menus/?start_date=${date}&end_date=${date}&except_empty=${isExceptEmptyRestaurant}`;

  return axios
    .get(springUrl, config)
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
      const result = rawData.map((menuList: any) => ({
        date: menuList.date,
        BR: menuList.br || menuList.BR || [],
        LU: menuList.lu || menuList.LU || [],
        DN: menuList.dn || menuList.DN || [],
      }));
      return { count, result };
    })
    .catch((e) => {
      const status = e?.response?.status;
      if (status !== 404) throw e;
      return axios.get(legacyUrl, config).then((res) => {
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
        const result = rawData.map((menuList: any) => ({
          date: menuList.date,
          BR: menuList.br || menuList.BR || [],
          LU: menuList.lu || menuList.LU || [],
          DN: menuList.dn || menuList.DN || [],
        }));
        return { count, result };
      });
    });
};

export const getMenu = (menuID: number, accessToken: string = ""): Promise<RawMenu> => {
  const config = !!accessToken ? { headers: { Authorization: `Bearer ${accessToken}` } } : {};

  const springUrl = !!accessToken
    ? `${APIendpoint()}/menus/${menuID}`
    : `${APIendpoint()}/menus/${menuID}/web`;

  const legacyUrl = !!accessToken
    ? `${APIendpoint()}/menus/${menuID}`
    : `${APIendpoint()}/menus/plain/${menuID}`;

  return axios
    .get(springUrl, config)
    .then((res) => {
      const { data } = res;
      return data;
    })
    .catch((e) => {
      const status = e?.response?.status;
      if (status !== 404) throw e;
      return axios
        .get(legacyUrl, config)
        .then((res) => res.data)
        .catch((err) => {
          throw err;
        });
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
  if (isMockToken(accessToken)) {
    return Promise.resolve(getMockLikedMenus());
  }

  return axios
    .get(`${APIendpoint()}/menus/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
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
