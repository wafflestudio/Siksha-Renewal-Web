import { useMenuDispatchContext, useMenuStateContext } from "providers/MenuProvider";
import useAuth from "./UseAuth";
import useError from "./useError";
import { getMenu } from "utils/api/menus";
import { getReviews, setReview } from "utils/api/reviews";
import { useCallback } from "react";

export default function useMenu() {
  const { menu, reviews, menuLoading } = useMenuStateContext();
  const { setMenu, setReviews, setMenuLoading } = useMenuDispatchContext();
  const { getAccessToken } = useAuth();
  const { onHttpError } = useError();   // Error handling

  const fetchMenu = useCallback(async (menuId) => {
    const accessToken = await getAccessToken().catch((error) => "");
    getMenu(menuId, accessToken)
      .then((menuData) => {
        setMenu(menuData);
      })
      .catch((e) => {
        onHttpError(e);
      });
  }, [setMenu, getAccessToken, onHttpError]);

  const fetchReviews = useCallback(async (menuId) => {
    getReviews(menuId)
      .then((reviewsData) => {
        setReviews({
          result: reviewsData.result,
          total_count: reviewsData.totalCount,
        });
      })
      .catch((e) => {
        onHttpError(e);
      });
  }, [setReviews, onHttpError]);

  const submitReview = useCallback(async (body: FormData) => {
    const accessToken = await getAccessToken().catch((error) => "");
    return setReview(body, accessToken);
  }, [getAccessToken]);

  const fetchData = useCallback(async (menuId) => {
    setMenuLoading(true);
    try {
      await Promise.all([fetchMenu(menuId), fetchReviews(menuId)]);
    } finally {
      setMenuLoading(false);
    }
  }, [fetchMenu, fetchReviews, setMenuLoading]);

  return {
    menu,
    reviews,
    menuLoading,
    fetchMenu,
    fetchReviews,
    submitReview,
    fetchData,
  }
}