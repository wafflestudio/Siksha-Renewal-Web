import { useEffect } from "react";
import { useDispatchContext, useStateContext } from "hooks/ContextProvider";
import useModals from "./UseModals";
import LoginModal from "components/Auth/LoginModal";

export default function useFavorite() {
  const state = useStateContext();
  const dispatch = useDispatchContext();

  const { favoriteRestaurant, loginStatus } = state;
  const { setFavoriteRestaurant } = dispatch;
  const { openModal, openLoginModal } = useModals();

  useEffect(() => {
    if (loginStatus === false) {
      setFavoriteRestaurant([]);
      return;
    }

    const favoriteList = JSON.parse(localStorage.getItem("favorite_restaurant") ?? "[]");
    setFavoriteRestaurant(favoriteList);
  }, [loginStatus]);

  const toggleFavorite = (restaurantId: number) => {
    if (!loginStatus) openLoginModal();
    else {
      const newFavoriteList = favoriteRestaurant.includes(restaurantId)
        ? favoriteRestaurant.filter((id) => id !== restaurantId)
        : [...favoriteRestaurant, restaurantId];
      setFavoriteRestaurant(newFavoriteList);
      localStorage.setItem("favorite_restaurant", JSON.stringify(newFavoriteList));
    }
  };

  const isFavorite = (restaurantId: number) => favoriteRestaurant.includes(restaurantId);

  return { favoriteRestaurant, toggleFavorite, isFavorite };
}
