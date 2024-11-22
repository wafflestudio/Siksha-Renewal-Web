import useLocalStorage from "./UseLocalStorage";
import { RestaurantPreview } from "types";

export default function useOrder(type: "favorite" | "nonFavorite") {
  //   const key = type === "favorite" ? "favoriteOrderList" : "nonFavoriteOrderList";
  const key = type === "favorite" ? "orderList_favorite" : "orderList_nonFavorite";

  const { value, set: setStorage } = useLocalStorage(key, "[]");
  const orderList = JSON.parse(value || "[]");

  function setNewOrderList(newOrderList: RestaurantPreview[]) {
    setStorage(JSON.stringify(newOrderList));
  }

  return { orderList, setNewOrderList };
}
