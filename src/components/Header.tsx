import styled from "styled-components";
import { useRouter } from "next/router";
import { useDispatchContext, useStateContext } from "../hooks/ContextProvider";
import NavigationBar from "./NavigationBar";
import useModals from "hooks/UseModals";

// 추후 디렉토리 변경(/components/general) 필요해보입니다.
export default function Header() {
  const router = useRouter();
  const state = useStateContext();
  const { setLoginStatus } = useDispatchContext();

  const { loginStatus } = state;
  const { openLoginModal } = useModals();

  return (
    <Background>
      <Container>
        <SikshaIcon
          src={"/img/sikshaSplash.svg"}
          onClick={() => {
            router.push("/");
          }}
        />
        <Title
          onClick={() => {
            router.push("/");
          }}
        >
          서울대학교 식단 알리미
        </Title>
        <NavigationBar />
        {loginStatus ? (
          <LoginButton
            onClick={() => {
              localStorage.removeItem("access_token");
              router.push(`/`);
              setLoginStatus(false);
            }}
          >
            로그아웃
          </LoginButton>
        ) : (
          <LoginButton onClick={() => openLoginModal()}>로그인</LoginButton>
        )}
      </Container>
    </Background>
  );
}
const LoginButton = styled.div`
  position: absolute;
  right: 97px;
  bottom: 23px;
  background: none;
  font-size: 20px;
  font-weight: 400;
  color: #ffffff;
  cursor: pointer;

  @media (max-width: 768px) {
    position: absolute;
    right: 5vw;
    font-size: 16px;
    top: 21px;
  }
`;

const Background = styled.div`
  background: #ff9522;
  min-width: 1920px;
  @media (max-width: 768px) {
    min-width: 0;
  }
`;

const Container = styled.div`
  position: relative;
  height: 271px;
  width: 1920px;
  box-sizing: border-box;
  display: flex;
  padding-left: 258px;
  margin: auto;

  @media (max-width: 768px) {
    background: #ff9522;
    height: 60px;
    width: auto;
    top: 0;
    z-index: 1;
  }
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
// const NavBarContainer = styled.div`
//   width: 100%;
//   display: flex;
//   align-items: flex-end;
//   justify-content: center;
//   margin-right: 368px;
//   @media (max-width: 768px) {
//     display: none;
//   }
// `;
