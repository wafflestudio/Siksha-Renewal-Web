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
  height: calc(100vh - 410px);
  background: white;
  overflow-y: scroll;
`;

const Restaurants = styled.div`
  padding-top: 36px;
  padding-left: 26px;
`;

const Restaurant = styled.div`
  font-size: 16px;
  line-height: 18px;
  letter-spacing: -0.3px;
  color: #727272;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  padding-bottom: 17px;

  &:hover {
    cursor: pointer;
    text-decoration-line: underline;
  }
`;
