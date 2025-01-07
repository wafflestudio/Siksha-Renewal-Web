import { useState } from "react";
import useLocalStorage from "./UseLocalStorage";
import { RestaurantPreview } from "types";

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

  return {
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
  };
}
