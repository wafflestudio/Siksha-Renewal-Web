import Calendar from "./Calendar";
import styled from "styled-components";

const Container = styled.div`
  padding-right: 15px;
`

export default function LeftSide() {
    return (
        <Container>
            <Calendar />
        </Container>
    )
}
