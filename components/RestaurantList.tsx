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
                <RestaurantName>{restaurant.name_kr}</RestaurantName>
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
  font-size: 12px;
  line-height: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.3);
  letter-spacing: 2px;
  text-align: right;
  text-decoration: none;

  @media (max-width: 768px) {
    display: none;
    padding: 0 8px 4px 0;
  }

  -ms-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`;

const Favorite = styled.img`
  height: 18px;
  width: 18px;
  margin-left: 20px;
  cursor: pointer;
`;