import styled from "styled-components";
import { useRouter } from "next/Router";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const [login, setLogin] = useState<boolean>(false);
  useEffect(() => {
    setLogin(localStorage.getItem("access_token") ? true : false);
    console.log(login);
  }, []);
  if (login !== undefined) {
    return (
      <>
        <Container>
          <SikshaIcon src={"/img/siksha-splash.png"} />
          <Title>서울대학교 식단 알리미</Title>
          {login ? (
            <LoginButton
              onClick={() => {
                localStorage.removeItem("access_token");
                setLogin(false);
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
  top: 232px;
  right: calc(5vw);
`;
const Container = styled.div`
  background: #ff9522;
  height: 271px;
  width: 100vw;
  display: flex;

  @media (max-width: 768px) {
    background: #fe8c59;
    justify-content: center;
    position: absolute;
  }
`;

const SikshaIcon = styled.img`
  padding-top: 200px;
  padding-left: calc((100vw - 1155px) / 2);
  width: 86px;
  height: 50px;

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
  padding-top: 224px;
  padding-left: 32.5px;
  white-space: nowrap;

  @media (max-width: 768px) {
    display: none;
  }
`;
