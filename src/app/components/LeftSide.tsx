import styled from "styled-components";
import RestaurantList from "./RestaurantList";
import DesktopCalendar from "./DesktopCalendar";
import RestaurantFilter from "./RestaurantFilter";
import TwoColumnLayout from "styles/layouts/TwoColumnLayout";

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

const Container = styled(TwoColumnLayout.Left)`
  display: flex;
  flex-direction: column;
  gap: 14px;
  height: fit-content;
  box-sizing: border-box;
  width: 378px;

  @media (max-width: 900px) {
    flex: 0 0 360px;
  }
`;

const Content = styled.div`
  display: flex;
  padding: 22px 24px 40px 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;
  border-radius: 10px;
  background: var(--SemanticColor-Background-Primary, #fff);
`;

const HLine = styled.div`
  width: 100%;
  height: 1px;
  background: var(--SemanticColor-Border-Primary, #e5e6e9);
`;
