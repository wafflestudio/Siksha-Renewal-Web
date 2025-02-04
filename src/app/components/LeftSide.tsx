import styled from "styled-components";
import RestaurantList from "./RestaurantList";
import DesktopCalendar from "./DesktopCalendar";
import RestaurantFilter from "./ResturauntFilter";

export default function LeftSide() {
  return (
    <Container>
      <DesktopCalendar />
      <div style={{ marginTop: "35px", width: "330px" }}>
        <RestaurantFilter />
      </div>
      <div style={{ marginTop: "35px", width: "330px" }}>
        <RestaurantList />
      </div>
    </Container>
  );
}

const Container = styled.div`
  margin-left: 50px;
  margin-right: 18px;
  height: fit-content;
  box-sizing: border-box;
  min-width: 315px;
  max-width: 563px;
  flex-grow: 1;
`;
