import styled from "styled-components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const [loginStatus, setLoginStatus] = useState<boolean>(false);
  const [isLoginPage, setIsLoginPage] = useState<boolean>(false);
  useEffect(() => {
    setLoginStatus(localStorage.getItem("access_token") ? true : false);
    setIsLoginPage(router.asPath.localeCompare("/login/") === 0);
  }, []);
  if (loginStatus !== undefined) {
    return (
      <>
        <Container>
          <SikshaIcon
            src={"/img/siksha-splash.png"}
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
          {isLoginPage ? (
            <></>
          ) : loginStatus ? (
            <LoginButton
              onClick={() => {
                localStorage.removeItem("access_token");
                setLoginStatus(false);
              }}
            >
              로그아웃
            </LoginButton>
          ) : (
            <LoginButton
              onClick={() => {
                router.push("/login");
              }}
            >
              로그인
            </LoginButton>
          )}
        </Container>
      </>
    );
  }
}
const LoginButton = styled.div`
  background: none;
  cursor: pointer;
  font-size: 20px;
  font-family: NanumSquare;
  font-weight: 400;
  color: #ffffff;
  position: absolute;
  bottom: 16px;
  right: calc(5vw);
`;
const Container = styled.div`
  background: #ff9522;
  height: 25vh;
  width: 100vw;
  display: flex;
  max-height: 271px;
  position: relative;

  @media (max-width: 768px) {
    background: #fe8c59;
    justify-content: center;
    position: absolute;
  }
`;

const SikshaIcon = styled.img`
  position: absolute;
  bottom: 21.5px;
  left: calc((100vw - 1155px) / 2);
  width: 86px;
  height: 50px;
  cursor: pointer;

  @media (max-width: 768px) {
    padding: 0;
    width: 52px;
  }
`;

const Title = styled.div`
  font-family: "NIXGONFONTS V2.0";
  font-size: 20px;
  line-height: 20px;
  color: white;
  font-weight: 400;
  bottom: 27px;
  position: absolute;
  left: calc((100vw - 1155px) / 2 + 118.5px);
  white-space: nowrap;
  cursor: pointer;

  @media (max-width: 768px) {
    display: none;
  }
`;
