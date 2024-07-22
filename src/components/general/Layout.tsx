import Header from "components/Header";
import MobileNavigationBar from "components/MobileNavigationBar";
import { useDispatchContext, useStateContext } from "hooks/ContextProvider";
import UseAccessToken from "hooks/UseAccessToken";
import useIsMobile from "hooks/UseIsMobile";
import React, { useEffect } from "react";
import styled from "styled-components";
import { getMyData, loginRefresh } from "utils/api/auth";

interface LayoutProps {
  children: JSX.Element;
}

export default function Layout({ children }: LayoutProps) {
  const state = useStateContext();
  const { setLoginStatus, setUserInfo, setIsFilterFavorite, setIsExceptEmptyRestaurant } =
    useDispatchContext();
  const isMobile = useIsMobile();
  const { getAccessToken } = UseAccessToken();

  const { loginStatus, isExceptEmptyRestaurant } = state;

  useEffect(() => {
    getAccessToken()
      .then((accessToken) => loginRefresh(accessToken))
      .then((newAccessToken) => {
        localStorage.setItem("access_token", newAccessToken);
      })
      .catch((res) => {
        console.error(res);
      });
  }, []);

  useEffect(() => {
    setLoginStatus(!!localStorage.getItem("access_token"));

    getAccessToken()
      .then((accessToken) => getMyData(accessToken))
      .then(({ id, nickname }) => {
        setUserInfo({ id, nickname });
      })
      .catch((e) => {
        console.error(e);
        setUserInfo({ id: null, nickname: null });
      });
  }, [loginStatus]);

  useEffect(() => {
    if (!isMobile) setIsFilterFavorite(false);
  }, [isMobile]);

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

  return (
    <Container id="root-layout">
      <Header />
      <Content>{children}</Content>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-width: 1920px;
  height: 100dvh;
  @media (max-width: 768px) {
    min-width: 0;
    width: 100vw;
    height: 100dvh;
    display: flex;
    flex-direction: column;
  }
`;

const Content = styled.div`
  @media (max-width: 768px) {
    flex: 1;
    height: calc(100% - 143px);
  }
`;
