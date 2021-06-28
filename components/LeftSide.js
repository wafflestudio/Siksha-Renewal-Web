import Calendar from "./Calendar";
import styled from "styled-components";
import RestaurantList from "./RestaurantList";

const Container = styled.div`
  padding-right: 15px;
  height: calc(100vh - 60px);
  width: 23.75em;
  min-width: 23.75em;
`

const Line = styled.div`
  width: 100%;
  height: 8px;
  background: #F8F8F8;
`

export default function LeftSide() {
    return (
        <Container>
            <Calendar/>
            <Line/>
            <RestaurantList/>
        </Container>
    );
}
