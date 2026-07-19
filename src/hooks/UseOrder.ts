import { useMemo } from "react";
import useLocalStorage from "./UseLocalStorage";
import { RestaurantPreview } from "types";

export default function useOrder(type: "favorite" | "nonFavorite") {
  //   const key = type === "favorite" ? "favoriteOrderList" : "nonFavoriteOrderList";
  const key = type === "favorite" ? "orderList_favorite" : "orderList_nonFavorite";

  const { value, set: setStorage } = useLocalStorage(key, "[]");
  const orderList: RestaurantPreview[] = useMemo(() => JSON.parse(value || "[]"), [value]);

  function setNewOrderList(newOrderList: RestaurantPreview[]) {
    setStorage(JSON.stringify(newOrderList));
  }

  // 하이드레이션 클로저에 갇히지 않도록 최신 저장값을 직접 읽는다.
  function getStoredOrderList(): RestaurantPreview[] {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem(key) || "[]");
  }

  return { orderList, setNewOrderList, getStoredOrderList };
}
