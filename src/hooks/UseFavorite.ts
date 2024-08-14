import { useEffect, useState } from "react";
import useModals from "./UseModals";
import useLocalStorage from "./UseLocalStorage";
import useAuth from "./UseAuth";

export default function useFavorite() {
  const { authStatus } = useAuth();

  const [favoriteRestaurants, setFavoriteRestaurants] = useState<number[]>([]);

  const { openLoginModal } = useModals();

  // favoriteList는 로컬 스토리지에 저장된 favorite restaurant id list입니다
  const { value, set: setStorage } = useLocalStorage("favorite_restaurant", "[]");
  const favoriteList = JSON.parse(value);

  useEffect(() => {
    if (authStatus === "logout") {
      setFavoriteRestaurants([]);
      return;
    }

    // 초깃값 세팅
    setFavoriteRestaurants(favoriteList);
  }, [authStatus]);

  const toggleFavorite = (restaurantId: number) => {
    if (authStatus === "logout") openLoginModal();
    else {
      const newFavoriteList = favoriteRestaurants.includes(restaurantId)
        ? favoriteRestaurants.filter((id) => id !== restaurantId)
        : [...favoriteRestaurants, restaurantId];
      setFavoriteRestaurants(newFavoriteList);

      // 변경값 반영
      setStorage(newFavoriteList);
    }
  };

  const isFavorite = (restaurantId: number) => favoriteRestaurants.includes(restaurantId);

  return { favoriteRestaurants, toggleFavorite, isFavorite };
}
