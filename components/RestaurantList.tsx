import styled from "styled-components";
import { useStateContext } from "../hooks/ContextProvider";

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

  return (
    <Container>
      <Restaurants>
        {data[meal] &&
          data[meal].map((restaurant) => (
            <Restaurant key={restaurant.id} onClick={() => scrollRestaurant(restaurant.code)}>
              {restaurant.name_kr}
            </Restaurant>
          ))}
      </Restaurants>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: max(191px, 100vh - 526px - min(25vh, 271px));
  max-height: 500px;
  background: white;
  overflow-y: scroll;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 5.7% 11.4%;
`;

const Restaurants = styled.div``;

const Restaurant = styled.div`
  font-size: 14px;
  line-height: 16px;
  letter-spacing: -0.3px;
  color: #727272;
  text-decoration: underline;
  text-underline-offset: 3px;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  padding-bottom: 12px;

  &:hover {
    cursor: pointer;
    text-decoration-line: underline;
  }

  &:last-child {
    padding-bottom: 0;
  }
`;
