import styled from "styled-components";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

const Container = styled.div`
  display: flex;
  justify-content: center;
`

export default function Body() {
    return (
        <Container>
            <LeftSide />
            <RightSide />
        </Container>
    )
}
