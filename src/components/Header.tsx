import styled from "styled-components";
import { useRouter } from "next/router";
import { useDispatchContext, useStateContext } from "../hooks/ContextProvider";
import NavigationBar from "./NavigationBar";

export default function Header() {
  const router = useRouter();
  const state = useStateContext();
  const { setLoginStatus, setLoginModal } = useDispatchContext();

  const { loginStatus } = state;

  return (
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
        <LoginButton onClick={() => setLoginModal(true)}>로그인</LoginButton>
      )}
    </Container>
  );
}
const LoginButton = styled.div`
  background: none;
  cursor: pointer;
  font-size: 20px;
  font-weight: 400;
  color: #ffffff;
  position: absolute;
  bottom: 16px;
  right: 97px;

  @media (max-width: 768px) {
    right: 5vw;
    font-size: 16px;
    top: 21px;
  }
`;

const Container = styled.div`
  background: #ff9522;
  position: relative;
  height: 25vh;
  min-height: 100px;
  display: flex;
  max-height: 271px;
  padding: 0 calc(max(100vw - max(1221px, min(73vw, 1417px)), 0px) / 2);

  @media (max-width: 768px) {
    background: #ff9522;
    height: 60px;
    min-height: 0;
    min-width: 0;
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
