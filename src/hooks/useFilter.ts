import getDistance from "utils/getDistance";
import useLocalStorage from "./UseLocalStorage";
import { RawMenuList } from "types";
import { useMemo } from "react";

type FilterList = {
  length: number;
  priceMin: number;
  priceMax: number;
  ratingMin: number;
  isReview: boolean;
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

const defaultFilters: FilterList = {
  length: Infinity,
  priceMin: 0,
  priceMax: Infinity,
  ratingMin: 0,
  isReview: false,
  category: [],
  favorite: false,
};

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
  const defaultFiltersJson = JSON.stringify(defaultFilters, replacer);

  // localStorage가 구독되어 변화를 감지하므로, 따로 state를 만들어주기 보다는 JSON parse 결과를 바로 이용해야 합니다.
  const { value, set: setStorage } = useLocalStorage("filterList", defaultFiltersJson);

  const filterList: FilterList = JSON.parse(value || defaultFiltersJson, reviver);

  /**
   * 필터의 각 옵션의 변경 여부를 반환합니다.
   * @returns {Record<keyof FilterList, boolean>} 각 옵션의 변경 여부
   */
  const isChanged = useMemo(() => {
    const changes = {} as Record<keyof FilterList, boolean>;
    (Object.keys(defaultFilters) as (keyof FilterList)[]).forEach((key) => {
      if (Array.isArray(filterList[key])) {
        changes[key] = 
          JSON.stringify(filterList[key]) !== JSON.stringify(defaultFilters[key]);
      } 
      else {
        changes[key] = filterList[key] !== defaultFilters[key];
      }
    });
    return changes;
  }, [filterList]);

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
    if (navigator?.geolocation) {
      const { geolocation } = navigator;
      geolocation.getCurrentPosition((position) => {
        currentPosition = { lat: position.coords.latitude, lng: position.coords.longitude };
      });
    }

    Object.keys(menuList).forEach((key) => {
      filteredList[key] = structuredClone(menuList[key]);
      if (key !== "date") {
        // 위치 기반 식당 필터링
        filteredList[key] = filteredList[key].filter((restaurant) => {
          if (currentPosition && restaurant.lat && restaurant.lng) {
            const { lat: currentLat, lng: currentLng } = currentPosition;
            const { lat: RestaurantLat, lng: RestaurantLng } = menuList[key];
            const distance = getDistance(currentLat, currentLng, RestaurantLat, RestaurantLng);
            if (distance > filterList.length) return false;
          }
          return true;
        });
        // 가격, 평점 등으로 메뉴 필터링
        filteredList[key].forEach((restaurant) => {
          if (restaurant.menus) {
            restaurant.menus = restaurant.menus.filter((menu) => {
              if (menu.price < filterList.priceMin || menu.price > filterList.priceMax)
                return false;
              if (menu.rating < filterList.ratingMin) return false;
              if (filterList.isReview && menu.review_cnt === 0) return false;
              if (filterList.favorite && !menu.favorite) return false;
              // if (filterList.category.length > 0 && !filterList.category.includes(menu.category)) return false;
              return true;
            });
          }
        });
      }
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
     * 필터의 각 옵션의 변경 여부입니다.
     * @type {Record<keyof FilterList, boolean>}
     */
    isChanged,
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
