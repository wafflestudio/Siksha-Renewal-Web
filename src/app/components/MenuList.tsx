"use client";

import MenuCard from "./MenuCard";
import styled from "styled-components";
import { useStateContext } from "../../providers/ContextProvider";
import { useEffect, useState, useMemo } from "react";
import { LoadingAnimation } from "styles/globalstyle";
import useFavorite from "hooks/UseFavorite";
import { RawMenu, RawMenuList, RawRestaurant } from "types";
import UseFilter from "hooks/UseFilter";

export default function MenuList() {
  const state = useStateContext();

  const { meal, data, date, loading, isFilterFavorite } = state;
  const { favoriteRestaurants } = useFavorite();
  const { filterList, filterMenuList } = UseFilter();
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  // Memoize filtered data to prevent recalculation on every render
  const filteredData = useMemo(() => {
    return filterMenuList(data, location);
  }, [data, location, filterList, filterMenuList]);

  // Memoize the meal-specific list
  const filteredMealList = useMemo(() => {
    return filteredData[meal] || [];
  }, [filteredData, meal]);

  // Memoize hasData calculation
  const hasData = useMemo(() => {
    if (!filteredMealList || filteredMealList.length === 0) return false;

    if (isFilterFavorite) {
      return filteredMealList.some((res) => favoriteRestaurants.includes(res.id));
    }

    return true;
  }, [filteredMealList, isFilterFavorite, favoriteRestaurants]);

  return (
    <Container key={date + meal}>
      {loading ? (
        <EmptyText>식단을 불러오는 중입니다.</EmptyText>
      ) : !hasData ? (
        <EmptyText>식단 정보가 없습니다.</EmptyText>
      ) : (
        <>
          {filteredMealList.map(
            (
              restaurant: RawRestaurant & {
                menus: RawMenu[];
              },
            ) => {
              if (isFilterFavorite) {
                return favoriteRestaurants.includes(restaurant.id) ? (
                  <MenuCard data={restaurant} key={restaurant.id + meal} />
                ) : null;
              } else return <MenuCard data={restaurant} key={restaurant.id + meal} />;
            },
          )}
          <div style={{ height: "26px" }} />
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;

  align-items: center;
  width: 100%;
  gap: 16px;

  @media (max-width: 768px) {
    height: 100px;
    flex-grow: 1;
    padding-bottom: 83px; // mobile navigation bar height + 40px padding
    gap: 18px;
  }

  ${LoadingAnimation}
`;

const EmptyText = styled.div`
  color: var(--Color-Foundation-gray-600);
  font-weight: 400;
  font-size: 16px;
  text-align: center;
  margin: auto;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;
