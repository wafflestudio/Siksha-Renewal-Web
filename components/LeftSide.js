import Calendar from "./Calendar";
import styled from "styled-components";
import RestaurantList from "./RestaurantList";

const Container = styled.div`
  padding-right: 15px;
  height: calc(100vh - 60px);
  width: 340px;
`;

const Line = styled.div`
  width: 100%;
  height: 8px;
  background: #f8f8f8;
`;

export default function LeftSide() {
  return (
    <Container>
      <Calendar />
      <Line />
      <RestaurantList />
    </Container>
  );
}
