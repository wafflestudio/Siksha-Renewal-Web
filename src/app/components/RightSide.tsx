import styled from "styled-components";
import Meal from "./Meal";
import MenuList from "app/components/MenuList";
import TwoColumnLayout from "styles/layouts/TwoColumnLayout";

export default function RightSide() {
  return (
    <Container>
      <Meal />
      <MenuList />
    </Container>
  );
}

const Container = styled(TwoColumnLayout.Right)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-left: 18px;
  box-sizing: border-box;
  max-width: 818px;
  height: 100%;
  flex-grow: 1;

  @media (max-width: 900px) {
    max-width: 445px;
  }
`;
