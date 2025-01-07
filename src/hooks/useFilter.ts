import { useState } from "react";
import useLocalStorage from "./UseLocalStorage";
import { RawMenuList } from "types";

type FilterList = {
  length: number;
  priceMin: number;
  priceMax: number;
  ratingMin: number;
  category: string[];
  favorite: boolean;
};

// JSON.stringify 시 Infinity 값을 문자열로 변환
function replacer(key: string, value: any) {
  if (typeof value === "number" && !isFinite(value)) return value.toString();
  else return value;
}

// JSON.parse 시 문자열로 변환된 Infinity 값을 다시 숫자로 변환
function reviver(key: string, value: any) {
  if (value === "Infinity") return Infinity;
  else if (value === "-Infinity") return -Infinity;
  else return value;
}

/**
 * 필터 옵션을 관리하는 커스텀 훅입니다.
 * @returns {{
 *   filterList: FilterList,
 *   changeFilterOption: (filterOption: Partial<FilterList>) => void,
 *   setFilterList: (newFilterList: Partial<FilterList>) => void,
 *   setNewOrderList: (newOrderList: RestaurantPreview[]) => void
 * }} 필터 리스트와 필터 옵션을 변경하는 함수들을 반환합니다.
 */
export default function useFilter() {
  const defaultFilters: FilterList = {
    length: Infinity,
    priceMin: 0,
    priceMax: Infinity,
    ratingMin: 0,
    category: [],
    favorite: false,
  };
  const defaultFiltersJson = JSON.stringify(defaultFilters, replacer);

  // localStorage가 구독되어 변화를 감지하므로, 따로 state를 만들어주기 보다는 JSON parse 결과를 바로 이용해야 합니다.
  const { value, set: setStorage } = useLocalStorage("filterList", defaultFiltersJson);

  const filterList: FilterList = JSON.parse(value || defaultFiltersJson, reviver);

  /**
   * 필터 옵션 일부를 변경합니다.
   * @param {Partial<FilterList>} filterOption - 변경할 필터 옵션
   */
  const changeFilterOption = (filterOption: Partial<FilterList>) => {
    const newFilters = { ...filterList, ...filterOption };
    setStorage(JSON.stringify(newFilters, replacer));
  };

  /**
   * 새로운 필터 리스트를 설정합니다. changeFilterOption과 다르게 기존 필터 리스트를 완전히 대체합니다.
   * @param {Partial<FilterList>} newFilterList - 새로운 필터 리스트
   */
  const setFilterList = (newFilterList: Partial<FilterList>) => {
    const newFilters = { ...defaultFilters, ...newFilterList };
    setStorage(JSON.stringify(newFilters, replacer));
  };

  /**
   * 필터 리스트를 초기화합니다.
   */
  const resetFilterList = () => {
    setStorage(defaultFiltersJson);
  };

  /**
   * 메뉴 리스트를 필터링합니다.
   * @param {RawMenuList} menuList - 필터링할 메뉴 데이터
   * @returns {RawMenuList} 필터링된 메뉴 데이터
   */
  const filterMenuList = (menuList: RawMenuList): RawMenuList => {
    const filteredList = {};
    let currentPosition: { lat: number; lng: number } | null = null;
    const { geolocation } = navigator;
    if (geolocation) {
      geolocation.getCurrentPosition((position) => {
        currentPosition = { lat: position.coords.latitude, lng: position.coords.longitude };
      });
    }

    const getDistance = (lat1, lon1, lat2, lon2) => {
      const deg2rad = (deg) => deg * (Math.PI / 180);

      const R = 6371; // 지구 반지름 (단위: km)
      const dLat = deg2rad(lat2 - lat1);
      const dLon = deg2rad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c; // 두 지점 간의 거리 (단위: km)
      return distance;
    };

    Object.keys(menuList).forEach((key) => {
      if (key === "date") filteredList[key] = menuList[key];
      else
        filteredList[key] = menuList[key].filter((menu) => {
          if (menu.price < filterList.priceMin || menu.price > filterList.priceMax) return false;
          if (menu.rating < filterList.ratingMin) return false;
          if (filterList.favorite && !menu.favorite) return false;
          if (currentPosition && menu.etc.lat && menu.etc.lng) {
            const { lat: currentLat, lng: currentLng } = currentPosition;
            const { lat: RestaurantLat, lng: RestaurantLng } = menuList[key];
            const distance = getDistance(currentLat, currentLng, RestaurantLat, RestaurantLng);
            if (distance > filterList.length) return false;
          }
          // if (filterList.category.length > 0 && !filterList.category.includes(menu.category)) return false;
          return true;
        });
    });

    return filteredList as RawMenuList;
  };

  return {
    /**
     * 필터 리스트입니다.
     * @type {FilterList}
     */
    filterList,
    /**
     * 필터 옵션 일부를 변경하는 함수입니다.
     * @param {Partial<FilterList>} filterOption - 변경할 필터 옵션
     */
    changeFilterOption,
    /**
     * 새로운 필터 리스트를 설정하는 함수입니다. changeFilterOption과 다르게 기존 필터 리스트를 완전히 대체합니다.
     * @param {Partial<FilterList>} newFilterList - 새로운 필터 리스트
     */
    setFilterList,
    /**
     * 필터 리스트를 초기화하는 함수입니다..
     */
    resetFilterList,
    /**
     * 메뉴 리스트를 필터링하는 함수입니다.
     * @param {RawMenuList} menuList - 필터링할 메뉴 데이터
     */
    filterMenuList,
  };
}
