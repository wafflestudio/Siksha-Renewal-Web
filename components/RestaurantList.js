import styled from "styled-components";
import {useStateContext} from "../utils/hooks/ContextProvider";

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 370px);
  background: white;
  overflow-y: scroll;
`

const Restaurants = styled.div`
  padding-top: 36px;
  padding-left: 26px;
`

const Restaurant = styled.div`
  font-size: 16px;
  line-height: 18px;
  letter-spacing: -0.3px;
  text-decoration-line: underline;
  color: #727272;
  font-weight: 100;
  display: flex;
  flex-direction: column;
  padding-bottom: 12px;

  &:hover {
    cursor: pointer;
  }
`

function scrollRestaurant(restaurant) {
    let element = document.querySelector(".a"+restaurant)
    if(!element) {
        throw new Error('Cannot find element')
    }
    element.scrollIntoView({ behavior: "smooth" })
}

export default function RestaurantList() {
    const state = useStateContext();

    const { meal, data } = state;

    return (
        <Container>
            <Restaurants>
                {data[meal] && data[meal].map((restaurant) =>
                    <Restaurant
                        key={restaurant.id}
                        onClick={() => scrollRestaurant(restaurant.code)}
                    >
                        {restaurant.name_kr}
                    </Restaurant>
                )}
            </Restaurants>
        </Container>
    )
}
