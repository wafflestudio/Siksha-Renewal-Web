import styled from "styled-components";
import { useStateContext } from "providers/ContextProvider";
import { useEffect, useState } from "react";
import useFavorite from "hooks/UseFavorite";
import { sanitizeCssSelector } from "utils/FormatUtil";

function scrollRestaurant(restaurant) {
  let element = document.querySelector(".a" + sanitizeCssSelector(restaurant));
  if (!element) {
    throw new Error("Cannot find element");
  }
  element.scrollIntoView({ behavior: "smooth" });
}

export default function RestaurantList() {
  const state = useStateContext();

  const { meal, data } = state;

  const { favoriteRestaurants, toggleFavorite, isFavorite } = useFavorite();

  const [favoriteFirstRestaurants, setFavoriteFirstRestaurants] = useState<Array<any>>([]);

  useEffect(() => {
    const favorites = data[meal].filter((restaurant) => isFavorite(restaurant.id));
    const nonFavorites = data[meal].filter((restaurant) => isFavorite(restaurant.id) === false);

    const newFavoriteFirstRestaurants = favorites.concat(nonFavorites);
    setFavoriteFirstRestaurants(newFavoriteFirstRestaurants);
  }, [data, favoriteRestaurants.length]);

  return (
    <Container show={data[meal].length >= 1}>
      <Header>식당 찾기</Header>
      <Restaurants>
        {favoriteFirstRestaurants &&
          favoriteFirstRestaurants.map((restaurant) => (
            <Restaurant key={restaurant.id}>
              <RestaurantName onClick={() => scrollRestaurant(restaurant.code)}>
                {restaurant.name_kr}
              </RestaurantName>
              {isFavorite(restaurant.id) ? (
                <Star
                  src="/img/general/star-on-orange.svg"
                  onClick={() => toggleFavorite(restaurant.id)}
                  alt="좋아요"
                />
              ) : (
                <Star
                  src="/img/general/star-empty-orange.svg"
                  onClick={() => toggleFavorite(restaurant.id)}
                  alt=""
                />
              )}
            </Restaurant>
          ))}
      </Restaurants>
    </Container>
  );
}

const Container = styled.div<{ show: boolean }>`
  display: ${(props) => (props.show === false ? "none" : "flex")};
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;

  max-height: 266px;
  background: white;
  overflow-y: scroll;
  box-sizing: border-box;
  gap: 22px;
`;

const Header = styled.h3`
  margin: 0;
  color: var(--Color-Foundation-gray-900, #262728);
  /* text-16/ExtraBold */
  font-size: var(--Font-size-16, 16px);
  font-style: normal;
  font-weight: var(--Font-weight-extrabold, 800);
  line-height: 140%; /* 22.4px */
`;

const Restaurants = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-row-gap: 8px;
  grid-column-gap: 8px;
`;

const Restaurant = styled.div`
  display: flex;
  width: 161px;
  height: 38px;
  justify-content: center;
  align-items: center;
  gap: 2px;
  flex: 1 0 0;
  box-sizing: border-box;
  border-radius: 6px;
  border: 1px solid var(--Color-Foundation-gray-200, #e5e6e9);

  &:hover {
    cursor: pointer;
  }
`;

const RestaurantName = styled.div`
  overflow: hidden;
  color: var(--Color-Foundation-gray-700, #727478);
  text-align: center;
  text-overflow: ellipsis;

  /* text-13/Bold */
  font-size: var(--Font-size-13, 13px);
  font-style: normal;
  font-weight: var(--Font-weight-bold, 700);
  line-height: 140%; /* 18.2px */
`;

const Star = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
