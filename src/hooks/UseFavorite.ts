import useModals from "./UseModals";
import useLocalStorage from "./UseLocalStorage";
import useAuth from "./UseAuth";

export default function useFavorite() {
  const { authStatus } = useAuth();

  const { openLoginModal } = useModals();

  const { value, set: setStorage } = useLocalStorage("favorite_restaurant", "[]");
  // localStorage가 구독되어 변화를 감지하므로, 따로 state를 만들어주기 보다는 JSON parse 결과를 바로 이용해야 합니다.
  const favoriteRestaurants: number[] = JSON.parse(value || "[]");

  // 하이드레이션 클로저에 갇히지 않도록 최신 저장값을 직접 읽는다.
  function getStoredFavorites(): number[] {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("favorite_restaurant") || "[]");
  }

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

  const setFavoriteRestaurants = (restaurantIds: number[]) => {
    setStorage(JSON.stringify(restaurantIds));
  };

  const isFavorite = (restaurantId: number) => favoriteRestaurants.includes(restaurantId);

  return {
    favoriteRestaurants,
    toggleFavorite,
    setFavoriteRestaurants,
    isFavorite,
    getStoredFavorites,
  };
}
