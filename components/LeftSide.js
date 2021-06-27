import Calendar from "./Calendar";
import styled from "styled-components";

const Container = styled.div`
  padding-right: 15px;
  height: calc(100vh - 60px);
`

export default function LeftSide() {
    return (
        <Container>
            <Calendar />
        </Container>
    )
}
