import Calendar from "./Calendar";
import styled from "styled-components";
import RestaurantList from "./RestaurantList";

const Container = styled.div`
  padding-right: 15px;
  height: calc(100vh - 60px);
`

const Line = styled.div`
  width: 380px;
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
