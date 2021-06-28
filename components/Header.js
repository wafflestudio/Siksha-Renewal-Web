import styled from "styled-components";

const Container = styled.div`
  background: linear-gradient(268.79deg, #FF9A44 0%, #FF9A44 0.01%, #FE8B5B 50.28%, #FD7878 100%);
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
`

const SikshaIcon = styled.img`
  filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.1));
  padding-left: 23.5vw;
`

const SikshaTypo = styled.img`
  padding-left: 18px;
`

const Title = styled.div`
  font-size: 20px;
  line-height: 23px;
  color: white;
  font-weight: 100;
  padding-top: 8px;
  padding-left: 14px;
`

export default function Header() {
    return (
        <>
            <Container>
                <SikshaIcon src={"/img/siksha-icon.svg"} width={"64px"} />
                <SikshaTypo src={"/img/siksha-typo.svg"} width={"95px"} />
                <Title>서울대학교 식단 알리미</Title>
            </Container>
        </>
    )
}
