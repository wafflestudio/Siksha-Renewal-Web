import useLocalStorage from "./UseLocalStorage";

export default function useLikedMenus() {
  const { value, set: setStorage } = useLocalStorage("liked_menus", "[]");
  // localStorage가 구독되어 변화를 감지하므로, 따로 state를 만들어주기 보다는 JSON parse 결과를 바로 이용해야 합니다.
  const likedMenuIds: number[] = JSON.parse(value || "[]");

  const toggleLikedMenu = (menuId: number) => {
    const newLikedList = likedMenuIds.includes(menuId)
      ? likedMenuIds.filter((id) => id !== menuId)
      : [...likedMenuIds, menuId];

    // 변경값 반영
    setStorage(JSON.stringify(newLikedList));
  };

  const isMenuLiked = (menuId: number) => likedMenuIds.includes(menuId);

  const addLikedMenu = (menuId: number) => {
    if (!likedMenuIds.includes(menuId)) {
      setStorage(JSON.stringify([...likedMenuIds, menuId]));
    }
  };

  const removeLikedMenu = (menuId: number) => {
    const newLikedList = likedMenuIds.filter((id) => id !== menuId);
    setStorage(JSON.stringify(newLikedList));
  };

  return { likedMenuIds, toggleLikedMenu, isMenuLiked, addLikedMenu, removeLikedMenu };
}