import getDistance from "utils/getDistance";
import useLocalStorage from "./UseLocalStorage";
import { RawMenuList } from "types";
import { useCallback } from "react";
import { useMemo } from "react";
import { useStateContext } from "providers/ContextProvider";
import { defaultFilters } from "constants/filterOptions";

export type FilterList = {
  length: number;
  priceMin: number;
  priceMax: number;
  ratingMin: number;
  isAvailableOnly: boolean;
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
  // 영업 중 여부 확인을 위해 date를 불러옵니다.
  const { date } = useStateContext();

  const defaultFiltersJson = JSON.stringify(defaultFilters, replacer);

  // localStorage가 구독되어 변화를 감지하므로, 따로 state를 만들어주기 보다는 JSON parse 결과를 바로 이용해야 합니다.
  const { value, set: setStorage } = useLocalStorage("filterList", defaultFiltersJson);

  const filterList: FilterList = JSON.parse(value || defaultFiltersJson, reviver);

  /**
   * 필터의 각 옵션의 변경 여부를 반환합니다.
   * @returns {Record<keyof FilterList, boolean>} 각 옵션의 변경 여부
   */
  const isSet = useMemo(() => {
    const changes = {} as Record<keyof FilterList, boolean>;
    (Object.keys(defaultFilters) as (keyof FilterList)[]).forEach((key) => {
      if (Array.isArray(filterList[key])) {
        changes[key] = JSON.stringify(filterList[key]) !== JSON.stringify(defaultFilters[key]);
      } else {
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
  const filterMenuList = useCallback(
    (
      menuList: RawMenuList,
      currentPosition: {
        lat: number;
        lng: number;
      } | null = null,
    ): RawMenuList => {
      const needDistanceFilter = Number.isFinite(filterList.length) && filterList.length > 0;
      const needPriceFilter = filterList.priceMin > 0 || filterList.priceMax < Infinity;
      const needRatingFilter = filterList.ratingMin > 0;
      const needReviewFilter = filterList.isReview;
      const needIsAvailableOnlyFilter = filterList.isAvailableOnly;
      // const needFavoriteFilter = filterList.favorite;

      const filteredList: Record<string, any> = {};

      Object.keys(menuList).forEach((key) => {
        // menuList[key]를 복사
        filteredList[key] = structuredClone(menuList[key]);

        // 날짜만 들어있는 key는 필터링 패스
        if (key === "date") return;

        // 위치 기반 식당 필터링
        if (needDistanceFilter && currentPosition) {
          filteredList[key] = filteredList[key].filter((restaurant) => {
            if (restaurant.lat && restaurant.lng) {
              const distance = getDistance(
                currentPosition!.lat,
                currentPosition!.lng,
                restaurant.lat,
                restaurant.lng,
              );
              console.log(distance);
              if (distance * 1000 > filterList.length) return false;
            }
            return true;
          });
        }
        // 영업 시간 기반 식당 필터링 (정보 없을 시 영업 X로 간주)
        if (needIsAvailableOnlyFilter) {
          filteredList[key] = filteredList[key].filter((restaurant) => {
            const operatingHours = restaurant.etc?.operating_hours;
            if (!operatingHours) return false; // 영업 시간 정보 없음 -> 영업 중

            const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

            let dayKey = "weekdays"; // 기본: Weekdays (Mon-Fri)
            if (dayOfWeek === 0) dayKey = "holiday"; // Sunday → Holiday
            if (dayOfWeek === 6) dayKey = "saturday"; // Saturday → Saturday

            const timeRanges: string[] = operatingHours[dayKey] || [];
            if (!timeRanges.length) return false; // 금일 영업 시간 정보 없음 → 영업 중

            const currentTime = date.toTimeString().slice(0, 5); // "HH:mm"

            // 주어진 영업 시간대 중 하나라도 현재 시간 포함 시 true
            return timeRanges.some((range) => {
              const [openTime, closeTime] = range.split("-");
              return currentTime >= openTime && currentTime <= closeTime;
            });
          });
        }
        // 가격, 평점, 리뷰, 즐겨찾기 등 필터링
        filteredList[key].forEach((restaurant) => {
          if (!restaurant.menus) return;
          restaurant.menus = restaurant.menus.filter((menu) => {
            if (
              needPriceFilter &&
              (menu.price < filterList.priceMin || menu.price > filterList.priceMax)
            )
              return false;
            if (needRatingFilter && (menu.rating ?? 0) < filterList.ratingMin) return false;
            if (needReviewFilter && menu.review_cnt === 0) return false;
            // if (needFavoriteFilter && !menu.favorite) return false;

            return true;
          });
        });
      });

      return filteredList as RawMenuList;
    },
    [filterList],
  );

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
    isSet,
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
