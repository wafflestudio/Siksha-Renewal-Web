import styled from "styled-components";
import Meal from "./Meal";
import MenuList from "./MenuList";

export default function RightSide() {
  return (
    <Container>
      <Meal />
      <MenuList />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-left: 18px;
  width: calc(73vw * 0.6);
  min-width: 785px;
  max-width: 818px;
  height: 100%;
  flex: 0 0 auto;
`;
