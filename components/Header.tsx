import styled from "styled-components";
import { useRouter } from "next/Router";

export default function Header() {
  const router = useRouter();
  return (
    <>
      <Container>
        <SikshaIcon src={"/img/siksha-icon.svg"} />
        <SikshaTypo>식샤</SikshaTypo>
        <Title>서울대학교 식단 알리미</Title>
        <LoginButton
          onClick={() => {
            router.push("/login");
          }}
        >
          로그인
        </LoginButton>
      </Container>
    </>
  );
}
const LoginButton = styled.button``;
const Container = styled.div`
  background: linear-gradient(268.79deg, #ff9a44 0%, #ff9a44 0.01%, #fe8b5b 50.28%, #fd7878 100%);
  height: 271px;
  width: 100vw;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    background: #fe8c59;
    justify-content: center;
    position: absolute;
  }
`;

const SikshaIcon = styled.img`
  filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.1));
  padding-left: calc((100vw - 1155px) / 2);
  width: 64px;

  @media (max-width: 768px) {
    padding: 0;
    width: 52px;
  }
`;

const SikshaTypo = styled.div`
  padding-left: 16px;
  font-size: 36px;
  line-height: 48px;
  font-weight: 700;
  color: #ffffff;

  @media (max-width: 768px) {
    display: none;
  }
`;

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
`;
