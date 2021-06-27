import styled from "styled-components";

const Container = styled.div`
  padding-left: 15px;
  background: white;
`

const Temp = styled.div`
  width: 785px;
`

export default function RightSide() {
    return (
        <Container>
            <Temp />
        </Container>
    )
}
