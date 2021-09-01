import styled from "styled-components";

const Container = styled.div`
  background: linear-gradient(268.79deg, #FF9A44 0%, #FF9A44 0.01%, #FE8B5B 50.28%, #FD7878 100%);
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    background: #FE8C59;
    justify-content: center;
    position: absolute;
  }
`

const SikshaIcon = styled.img`
  filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.1));
  padding-left: calc((100vw - 1155px)/2);
  width: 64px;

  @media (max-width: 768px) {
    padding: 0;
    width: 52px;
  }
`

const SikshaTypo = styled.div`
  padding-left: 16px;
  font-size: 36px;
  line-height: 48px;
  font-weight: 700;
  color: #FFFFFF;

  @media (max-width: 768px) {
    display: none;
  }
`

const Title = styled.div`
  font-size: 20px;
  line-height: 23px;
  color: white;
  font-weight: 400;
  padding-top: 8px;
  padding-left: 12px;
  white-space: nowrap;

  @media (max-width: 768px) {
    display: none;
  }
`

export default function Header() {
    return (
        <>
            <Container>
                <SikshaIcon src={"/img/siksha-icon.svg"} />
                <SikshaTypo>식샤</SikshaTypo>
                <Title>서울대학교 식단 알리미</Title>
            </Container>
        </>
    )
}
