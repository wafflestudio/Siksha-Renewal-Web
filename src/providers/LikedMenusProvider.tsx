"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { getLikedMenus, setMenuLike, setMenuUnlike } from "utils/api/menus";
import useAuth from "hooks/UseAuth";
import useError from "hooks/useError";

interface LikedMenusContextType {
  likedMenuIds: number[];
  toggleLikedMenu: (menuId: number) => Promise<void>;
  isMenuLiked: (menuId: number) => boolean;
  addLikedMenu: (menuId: number) => Promise<void>;
  removeLikedMenu: (menuId: number) => Promise<void>;
  loading: boolean;
  refetch: () => Promise<void>;
}

const LikedMenusContext = createContext<LikedMenusContextType | null>(null);

export function LikedMenusProvider({ children }: { children: ReactNode }) {
  const { getAccessToken, authStatus } = useAuth();
  const { onHttpError } = useError();
  const [likedMenuIds, setLikedMenuIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const refetch = useCallback(async () => {
    if (authStatus !== "login") return;

    try {
      setLoading(true);
      const accessToken = await getAccessToken();
      const response = await getLikedMenus(accessToken);

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
  }, [authStatus, getAccessToken, onHttpError]);

  useEffect(() => {
    if (authStatus !== "login") {
      setLikedMenuIds([]);
      return;
    }

    let isCancelled = false;

    const fetchLikedMenus = async () => {
      try {
        setLoading(true);
        const accessToken = await getAccessToken();
        const response = await getLikedMenus(accessToken);

        if (isCancelled) return;

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
        if (!isCancelled) onHttpError(error);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    fetchLikedMenus();

    return () => {
      isCancelled = true;
    };
  }, [authStatus, getAccessToken, onHttpError]);

  const toggleLikedMenu = useCallback(
    async (menuId: number) => {
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
    },
    [authStatus, getAccessToken, likedMenuIds, onHttpError],
  );

  const isMenuLiked = useCallback((menuId: number) => likedMenuIds.includes(menuId), [likedMenuIds]);

  const addLikedMenu = useCallback(
    async (menuId: number) => {
      if (authStatus !== "login" || likedMenuIds.includes(menuId)) return;

      try {
        const accessToken = await getAccessToken();
        await setMenuLike(menuId, accessToken);
        setLikedMenuIds((prev) => [...prev, menuId]);
      } catch (error) {
        onHttpError(error);
      }
    },
    [authStatus, getAccessToken, likedMenuIds, onHttpError],
  );

  const removeLikedMenu = useCallback(
    async (menuId: number) => {
      if (authStatus !== "login") return;

      try {
        const accessToken = await getAccessToken();
        await setMenuUnlike(menuId, accessToken);
        setLikedMenuIds((prev) => prev.filter((id) => id !== menuId));
      } catch (error) {
        onHttpError(error);
      }
    },
    [authStatus, getAccessToken, onHttpError],
  );

  return (
    <LikedMenusContext.Provider
      value={{
        likedMenuIds,
        toggleLikedMenu,
        isMenuLiked,
        addLikedMenu,
        removeLikedMenu,
        loading,
        refetch,
      }}
    >
      {children}
    </LikedMenusContext.Provider>
  );
}

export default function useLikedMenus() {
  const context = useContext(LikedMenusContext);
  if (!context) {
    throw new Error("useLikedMenus must be used within a LikedMenusProvider");
  }
  return context;
}
