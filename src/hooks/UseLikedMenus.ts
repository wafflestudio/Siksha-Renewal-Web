import { useState, useEffect } from "react";
import { getLikedMenus, setMenuLike, setMenuUnlike } from "utils/api/menus";
import useAuth from "./UseAuth";
import useError from "./useError";

export default function useLikedMenus() {
  const { getAccessToken, authStatus } = useAuth();
  const { onHttpError } = useError();
  const [likedMenuIds, setLikedMenuIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLikedMenus = async () => {
    if (authStatus !== "login") return;

    try {
      setLoading(true);
      const accessToken = await getAccessToken();
      const response = await getLikedMenus(accessToken);

      // Extract menu IDs from the response
      const menuIds: number[] = [];
      response.result.forEach((restaurant) => {
        restaurant.menus.forEach((menu) => {
          if (menu.is_liked) {
            menuIds.push(menu.id);
          }
        });
      });

      setLikedMenuIds(menuIds);
    } catch (error) {
      onHttpError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLikedMenus();
  }, [authStatus]);

  const toggleLikedMenu = async (menuId: number) => {
    if (authStatus !== "login") return;

    try {
      const accessToken = await getAccessToken();
      const isCurrentlyLiked = likedMenuIds.includes(menuId);

      if (isCurrentlyLiked) {
        await setMenuUnlike(menuId, accessToken);
        setLikedMenuIds((prev) => prev.filter((id) => id !== menuId));
      } else {
        await setMenuLike(menuId, accessToken);
        setLikedMenuIds((prev) => [...prev, menuId]);
      }
    } catch (error) {
      onHttpError(error);
    }
  };

  const isMenuLiked = (menuId: number) => likedMenuIds.includes(menuId);

  const addLikedMenu = async (menuId: number) => {
    if (authStatus !== "login" || likedMenuIds.includes(menuId)) return;

    try {
      const accessToken = await getAccessToken();
      await setMenuLike(menuId, accessToken);
      setLikedMenuIds((prev) => [...prev, menuId]);
    } catch (error) {
      onHttpError(error);
    }
  };

  const removeLikedMenu = async (menuId: number) => {
    if (authStatus !== "login") return;

    try {
      const accessToken = await getAccessToken();
      await setMenuUnlike(menuId, accessToken);
      setLikedMenuIds((prev) => prev.filter((id) => id !== menuId));
    } catch (error) {
      onHttpError(error);
    }
  };

  return {
    likedMenuIds,
    toggleLikedMenu,
    isMenuLiked,
    addLikedMenu,
    removeLikedMenu,
    loading,
    refetch: fetchLikedMenus,
  };
}
