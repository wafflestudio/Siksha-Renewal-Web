import styled from "styled-components";
import RestaurantList from "./RestaurantList";
import DesktopCalendar from "./DesktopCalendar";
import RestaurantFilter from "./RestaurantFilter";

export default function LeftSide() {
  return (
    <Container>
      <DesktopCalendar />
      <Content>
        <RestaurantFilter />
        <HLine></HLine>
        <RestaurantList />
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-left: 50px;
  margin-right: 18px;
  height: fit-content;
  box-sizing: border-box;
  width: 378px;
`;

const Content = styled.div`
  display: flex;
  padding: 22px 24px 40px 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;
  border-radius: 10px;
  background: var(--Color-Foundation-base-white, #fff);
`;

const HLine = styled.div`
  width: 100%;
  height: 1px;
  background: var(--Color-Foundation-gray-200, #e5e6e9);
`;
