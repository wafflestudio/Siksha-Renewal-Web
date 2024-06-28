import { useEffect } from "react";
import { useDispatchContext, useStateContext } from "hooks/ContextProvider";

export default function useFavorite() {
  const state = useStateContext();
  const dispatch = useDispatchContext();

  const { favoriteRestaurant, loginStatus } = state;
  const { setFavoriteRestaurant, setLoginModal } = dispatch;

  useEffect(() => {
    if (loginStatus === false) {
      setFavoriteRestaurant([]);
      return;
    }

    const favoriteList = JSON.parse(localStorage.getItem("favorite_restaurant") ?? "[]");
    setFavoriteRestaurant(favoriteList);
  }, [loginStatus]);

  const toggleFavorite = (restaurantId: number) => {
    if (loginStatus === false) {
      setLoginModal(true);
      return;
    }

    const newFavoriteList = favoriteRestaurant.includes(restaurantId)
      ? favoriteRestaurant.filter((id) => id !== restaurantId)
      : [...favoriteRestaurant, restaurantId];
    setFavoriteRestaurant(newFavoriteList);
    localStorage.setItem("favorite_restaurant", JSON.stringify(newFavoriteList));
  };

  const isFavorite = (restaurantId: number) => favoriteRestaurant.includes(restaurantId);

  return { favoriteRestaurant, toggleFavorite, isFavorite };
}
