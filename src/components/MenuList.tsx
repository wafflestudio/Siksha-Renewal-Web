import MenuCard from "./MenuCard";
import styled, { css } from "styled-components";
import { useStateContext } from "../hooks/ContextProvider";
import { useEffect, useState } from "react";

export default function MenuList() {
  const state = useStateContext();

  const { meal, data, showCal, date, loading, favoriteRestaurant, isFilterFavorite } = state;

  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    if (!data[meal] || data[meal].length == 0) setHasData(false);
    else if (
      isFilterFavorite &&
      data[meal].filter((res) => favoriteRestaurant.includes(res.id)).length === 0
    )
      setHasData(false);
    else setHasData(true);
  }, [data, meal, isFilterFavorite]);

  return (
    <Container showCal={showCal} key={date + meal}>
      {loading ? (
        <EmptyText>식단을 불러오는 중입니다.</EmptyText>
      ) : hasData ? (
        data[meal].map((restaurant) => {
          if (isFilterFavorite) {
            return favoriteRestaurant.includes(restaurant.id) ? (
              <MenuCard data={restaurant} key={restaurant.id + meal} />
            ) : null;
          } else return <MenuCard data={restaurant} key={restaurant.id + meal} />;
        })
      ) : (
        <EmptyText>업로드 된 식단이 없습니다.</EmptyText>
      )}
      {/* {!loading && <Download />} */}
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
    height: calc(100vh - 169px);
    position: absolute;
    top: 169px;
  }

  ${(props: { showCal: boolean }) =>
    !props.showCal &&
    css`
      animation: menuSlide 0.75s;
      -moz-animation: menuSlide 0.75s;
      -webkit-animation: menuSlide 0.75s;
      -o-animation: menuSlide 0.75s;

      @keyframes menuSlide {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @-moz-keyframes menuSlide {
        /* Firefox */
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @-webkit-keyframes menuSlide {
        /* Safari and Chrome */
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @-o-keyframes menuSlide {
        /* Opera */
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `}
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
