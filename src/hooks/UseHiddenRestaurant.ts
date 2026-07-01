import useLocalStorage from "./UseLocalStorage";

export default function useHiddenRestaurant() {
  const { value, set: setStorage } = useLocalStorage("hidden_restaurant", "[]");
  const hiddenRestaurants: number[] = JSON.parse(value || "[]");

  const hideRestaurant = (restaurantId: number) => {
    if (hiddenRestaurants.includes(restaurantId)) return;
    setStorage(JSON.stringify([...hiddenRestaurants, restaurantId]));
  };

  const showRestaurant = (restaurantId: number) => {
    setStorage(JSON.stringify(hiddenRestaurants.filter((id) => id !== restaurantId)));
  };

  const toggleHidden = (restaurantId: number) => {
    if (hiddenRestaurants.includes(restaurantId)) showRestaurant(restaurantId);
    else hideRestaurant(restaurantId);
  };

  const setHiddenRestaurants = (restaurantIds: number[]) => {
    setStorage(JSON.stringify(restaurantIds));
  };

  const isHidden = (restaurantId: number) => hiddenRestaurants.includes(restaurantId);

  return {
    hiddenRestaurants,
    hideRestaurant,
    showRestaurant,
    toggleHidden,
    setHiddenRestaurants,
    isHidden,
  };
}
