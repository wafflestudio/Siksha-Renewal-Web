import styled from "styled-components";
import Meal from "./Meal";
import MenuList from "app/components/MenuList";
import TwoColumnLayout from "styles/layouts/TwoColumnLayout";
import FestivalToggle from "./FestivalToggle";

export default function RightSide() {
  return (
    <Container>
      <div style={{
        display: "flex",
        position: "relative",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Meal />
        <FestivalToggle />
      </div>
      <MenuList />
    </Container>
  );
}

const Container = styled(TwoColumnLayout.Right)`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  max-width: 818px;
  flex-grow: 1;

  @media (max-width: 900px) {
    max-width: 445px;
  }
`;
