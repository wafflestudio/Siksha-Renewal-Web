import styled from "styled-components";
import Meal from "./Meal";
import MenuList from "./MenuList";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-left: 15px;
  width: 785px;
  min-width: 785px;
  height: calc(100vh - 60px);
`

export default function RightSide() {
    return (
        <Container>
            <Meal />
            <MenuList />
        </Container>
    )
}
