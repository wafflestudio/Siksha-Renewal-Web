import MenuCard from "../app/components/MenuCard";
import styled from "styled-components";
import { useStateContext } from "../providers/ContextProvider";
import { useEffect, useState } from "react";
import { LoadingAnimation } from "styles/globalstyle";
import useFavorite from "hooks/UseFavorite";

export default function MenuList() {
  const state = useStateContext();

  const { meal, data, date, loading, isFilterFavorite } = state;
  const { favoriteRestaurants } = useFavorite();

  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    if (!data[meal] || data[meal].length == 0) setHasData(false);
    else if (
      isFilterFavorite &&
      data[meal].filter((res) => favoriteRestaurants.includes(res.id)).length === 0
    )
      setHasData(false);
    else setHasData(true);
  }, [data, meal, isFilterFavorite]);

  return (
    <Container key={date + meal}>
      {loading ? (
        <EmptyText>식단을 불러오는 중입니다.</EmptyText>
      ) : hasData ? (
        data[meal].map((restaurant) => {
          if (isFilterFavorite) {
            return favoriteRestaurants.includes(restaurant.id) ? (
              <MenuCard data={restaurant} key={restaurant.id + meal} />
            ) : null;
          } else return <MenuCard data={restaurant} key={restaurant.id + meal} />;
        })
      ) : (
        <EmptyText>업로드 된 식단이 없습니다.</EmptyText>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;

  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
    height: 100px;
    flex-grow: 1;
  }

  ${LoadingAnimation}
`;

const EmptyText = styled.div`
  color: #919191;
  font-weight: 400;
  padding-top: 25px;
  padding-bottom: 30px;
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;
