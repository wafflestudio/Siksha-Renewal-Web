import styled from "styled-components";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useDispatchContext, useStateContext } from "../hooks/ContextProvider";
import NavigationBar from "./NavigationBar";
import APIendpoint from "../constants/constants";
import axios from "axios";

export default function Header() {
  const router = useRouter();
  const state = useStateContext();
  const { setLoginStatus, setLoginModal, setUserInfo, setIsExceptEmptyRestaurant } =
    useDispatchContext();

  const { loginStatus, isExceptEmptyRestaurant } = state;

  useEffect(() => {
    setLoginStatus(!!localStorage.getItem("access_token"));

    const access_token = localStorage.getItem("access_token");

    async function fetchUserInfo() {
      try {
        const res = await axios.get(`${APIendpoint()}/auth/me`, {
          headers: { "authorization-token": `Bearer ${access_token}` },
        });
        setUserInfo({ id: res.data.id, nickname: res.data.nickname });
      } catch (e) {
        setUserInfo({ id: null, nickname: null });
      }
    }

    fetchUserInfo();
  }, [loginStatus]);

  useEffect(() => {
    if (loginStatus) {
      const value = localStorage.getItem("isExceptEmptyRestaurant");

      if (value !== null) {
        setIsExceptEmptyRestaurant(JSON.parse(value));
      } else {
        localStorage.setItem("isExceptEmptyRestaurant", JSON.stringify(isExceptEmptyRestaurant));
      }
    }
  }, [loginStatus]);

  if (loginStatus !== undefined) {
    return (
      <>
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
              <LoginButton onClick={() => setLoginModal(true)}>로그인</LoginButton>
            )}
          </Container>
        </Background>
      </>
    );
  }
}
const LoginButton = styled.div`
  position: absolute;
  right: 97px;
  bottom: 23px;
  background: none;
  font-size: 20px;
  font-family: NanumSquare;
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
    min-height: 0;
    min-width: 0;
    width: auto;
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
  font-family: "NIXGONFONTS V2.0";
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
