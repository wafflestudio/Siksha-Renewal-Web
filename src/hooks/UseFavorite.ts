import { useEffect, useState } from "react";
import useModals from "./UseModals";
import useLocalStorage from "./UseLocalStorage";
import useAuth from "./UseAuth";

export default function useFavorite() {
  const { authStatus } = useAuth();

  const { openLoginModal } = useModals();

  const { value, set: setStorage } = useLocalStorage("favorite_restaurant", "[]");
  const parsedValue = JSON.parse(value ? value : "[]");

  const [favoriteRestaurants, setFavoriteRestaurants] = useState<number[]>(parsedValue);

  const toggleFavorite = (restaurantId: number) => {
    if (authStatus === "logout") openLoginModal();
    else {
      const newFavoriteList = favoriteRestaurants.includes(restaurantId)
        ? favoriteRestaurants.filter((id) => id !== restaurantId)
        : [...favoriteRestaurants, restaurantId];
      setFavoriteRestaurants(newFavoriteList);

      // 변경값 반영
      setStorage(JSON.stringify(newFavoriteList));
    }
  };

  const isFavorite = (restaurantId: number) => favoriteRestaurants.includes(restaurantId);

  return { favoriteRestaurants, toggleFavorite, isFavorite };
}
