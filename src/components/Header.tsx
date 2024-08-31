import styled from "styled-components";
import { useRouter } from "next/router";
import NavigationBar from "./NavigationBar";
import useModals from "hooks/UseModals";
import useAuth from "hooks/UseAuth";

// 추후 디렉토리 변경(/components/general) 필요해보입니다.
export default function Header() {
  const router = useRouter();

  const { authStatus } = useAuth();
  const { openLoginModal } = useModals();
  const { logout } = useAuth();

  return (
    <Background>
      <Container>
        <CIContainer>
          <SikshaIcon
            src={"/img/sikshaSplash.svg"}
            onClick={() => router.push("/")}
            alt="식샤 로고"
          />
          <Title onClick={() => router.push("/")}>서울대학교 식단 알리미</Title>
        </CIContainer>
        <NavigationBar />
        {authStatus === "login" ? (
          <LoginButton onClick={logout}>로그아웃</LoginButton>
        ) : (
          <LoginButton onClick={() => openLoginModal()}>로그인</LoginButton>
        )}
      </Container>
    </Background>
  );
}

const Background = styled.div`
  background: #ff9522;
`;

const Container = styled.div`
  position: relative;
  height: 271px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-evenly;
  margin: auto;

  @media (max-width: 768px) {
    background: #ff9522;
    height: 60px;
    width: auto;
    top: 0;
    z-index: 1;
  }
`;

const CIContainer = styled.div`
  display: flex;
`;

const SikshaIcon = styled.img`
  width: 86px;
  height: 50px;
  margin-top: auto;
  padding-bottom: 21.5px;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 50px;
    height: 25px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    top: 17px;
  }
`;

const Title = styled.div`
  font-size: 20px;
  line-height: 20px;
  color: white;
  font-weight: 400;
  margin-top: auto;
  margin-left: 32.5px;
  padding-bottom: 27px;
  white-space: nowrap;
  cursor: pointer;

  @media (max-width: 768px) {
    display: none;
  }
`;

const LoginButton = styled.button`
  margin-top: auto;
  padding-bottom: 21.5px;
  background: none;
  font-size: 20px;
  font-weight: 400;
  border: none;
  outline: none;
  color: #ffffff;
  cursor: pointer;
  white-space: nowrap;

  @media (max-width: 768px) {
    position: absolute;
    right: 5vw;
    font-size: 16px;
    top: 21px;
  }
`;
