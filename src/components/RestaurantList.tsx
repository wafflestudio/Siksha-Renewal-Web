import styled from "styled-components";
import { useStateContext } from "hooks/ContextProvider";
import { use, useEffect } from "react";
import useFavorite from "hooks/UseFavorite";

function scrollRestaurant(restaurant) {
  let element = document.querySelector(".a" + restaurant);
  if (!element) {
    throw new Error("Cannot find element");
  }
  element.scrollIntoView({ behavior: "smooth" });
}

export default function RestaurantList() {
  const state = useStateContext();

  const { meal, data } = state;

  const { toggleFavorite, isFavorite } = useFavorite();

  return (
    <Container>
      <Restaurants>
        {data[meal] &&
          data[meal].map((restaurant) => (
            <Restaurant key={restaurant.id} onClick={() => scrollRestaurant(restaurant.code)}>
              <RestaurantName>{restaurant.name_kr}</RestaurantName>
              <Dots>..............</Dots>
              {isFavorite(restaurant.id) ? (
                <Star src="/img/star.svg" onClick={() => toggleFavorite(restaurant.id)} />
              ) : (
                <Star src="/img/star-empty.svg" onClick={() => toggleFavorite(restaurant.id)} />
              )}
            </Restaurant>
          ))}
      </Restaurants>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-height: 300px;
  background: white;
  overflow-y: scroll;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 5.7% 11.4%;
`;

const Restaurants = styled.div``;

const Restaurant = styled.div`
  padding-bottom: 17px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;

  &:last-child {
    padding-bottom: 0;
  }

  &:hover {
    cursor: pointer;
  }
`;

const RestaurantName = styled.div`
  flex-grow: 1;
  font-size: 16px;
  line-height: 18px;
  letter-spacing: -0.3px;
  color: #727272;
  text-decoration: underline;
  text-underline-offset: 3px;
  font-weight: 400;
`;

const Dots = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 13.62px;
  letter-spacing: 2px;
  color: #0000004d;
`;

const Star = styled.img`
  width: 15px;
  height: 14px;
  margin-left: 20px;
  cursor: pointer;
`;
