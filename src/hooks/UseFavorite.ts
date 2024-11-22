import useModals from "./UseModals";
import useLocalStorage from "./UseLocalStorage";
import useAuth from "./UseAuth";

export default function useFavorite() {
  const { authStatus } = useAuth();

  const { openLoginModal } = useModals();

  const { value, set: setStorage } = useLocalStorage("favorite_restaurant", "[]");
  // localStorage가 구독되어 변화를 감지하므로, 따로 state를 만들어주기 보다는 JSON parse 결과를 바로 이용해야 합니다.
  const favoriteRestaurants: number[] = JSON.parse(value || "[]");

  const toggleFavorite = (restaurantId: number) => {
    if (authStatus === "logout") openLoginModal();
    else {
      const newFavoriteList = favoriteRestaurants.includes(restaurantId)
        ? favoriteRestaurants.filter((id) => id !== restaurantId)
        : [...favoriteRestaurants, restaurantId];

      // 변경값 반영
      setStorage(JSON.stringify(newFavoriteList));
    }
  };

  const isFavorite = (restaurantId: number) => favoriteRestaurants.includes(restaurantId);

  return { favoriteRestaurants, toggleFavorite, isFavorite };
}
