import { useEffect, useState } from "react";
import useLocalStorage from "./UseLocalStorage";
import { RestaurantPreview } from "types";

export default function useOrder(type: "favorite" | "nonFavorite") {
  //   const key = type === "favorite" ? "favoriteOrderList" : "nonFavoriteOrderList";
  const key = type === "favorite" ? "orderList_favorite" : "orderList_nonFavorite";

  const { value, set: setStorage } = useLocalStorage(key, "[]");
  const parsedValue = JSON.parse(value ? value : "[]");

  const [orderList, setOrderList] = useState<RestaurantPreview[]>(parsedValue);

  function setNewOrderList(newOrderList: RestaurantPreview[]) {
    setOrderList(newOrderList);
    setStorage(JSON.stringify(newOrderList));
  }

  return { orderList, setNewOrderList };
}
