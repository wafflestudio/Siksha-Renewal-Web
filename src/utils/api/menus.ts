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
  const apiUrl = !!accessToken
    ? `${APIendpoint()}/menus/lo?start_date=${date}&end_date=${date}&except_empty=${isExceptEmptyRestaurant}`
    : `${APIendpoint()}/menus/?start_date=${date}&end_date=${date}&except_empty=${isExceptEmptyRestaurant}`;
  const config = !!accessToken ? { headers: { "authorization-token": `Bearer ${accessToken}` } } : {};
  
  return axios
    .get(apiUrl, config)
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

export const getMenu = (menuID: number, accessToken: string = ""): Promise<RawMenu> => {
  const apiUrl = !!accessToken
    ? `${APIendpoint()}/menus/${menuID}`
    : `${APIendpoint()}/menus/plain/${menuID}`;
  const config = !!accessToken ? { headers: { "authorization-token": `Bearer ${accessToken}` } } : {};
  
  return axios
    .get(apiUrl, config)
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
