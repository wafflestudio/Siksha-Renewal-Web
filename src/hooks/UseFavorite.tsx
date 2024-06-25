import { useEffect } from "react";
import { useDispatchContext, useStateContext } from "hooks/ContextProvider";

export default function useFavorite() {
  const state = useStateContext();
  const dispatch = useDispatchContext();

  const { favoriteRestaurant } = state;
  const { setFavoriteRestaurant } = dispatch;

  useEffect(() => {
    const favoriteList = JSON.parse(localStorage.getItem("favorite_restaurant") ?? "[]");
    setFavoriteRestaurant(favoriteList);
  }, []);

  const toggleFavorite = (restaurantId: number) => {
    const newFavoriteList = favoriteRestaurant.includes(restaurantId)
      ? favoriteRestaurant.filter((id) => id !== restaurantId)
      : [...favoriteRestaurant, restaurantId];
    setFavoriteRestaurant(newFavoriteList);
    localStorage.setItem("favorite_restaurant", JSON.stringify(newFavoriteList));
  };

  const isFavorite = (restaurantId: number) => favoriteRestaurant.includes(restaurantId);

  return { favoriteRestaurant, toggleFavorite, isFavorite };
}
