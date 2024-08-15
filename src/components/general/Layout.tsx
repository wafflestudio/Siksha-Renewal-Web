import Header from "components/Header";
import { useDispatchContext, useStateContext } from "hooks/ContextProvider";
import useAuth from "hooks/UseAuth";
import useIsMobile from "hooks/UseIsMobile";
import UseProfile from "hooks/UseProfile";
import React, { useEffect } from "react";
import styled from "styled-components";
import { loginRefresh } from "utils/api/auth";
import Modals from "./Modals";

interface LayoutProps {
  children: JSX.Element;
}

export default function Layout({ children }: LayoutProps) {
  const state = useStateContext();
  const { setIsFilterFavorite, setIsExceptEmptyRestaurant } = useDispatchContext();
  const isMobile = useIsMobile();
  const { getAccessToken } = useAuth();
  const { login } = useAuth();
  UseProfile();

  const { authStatus, isExceptEmptyRestaurant } = state;

  useEffect(() => {
    getAccessToken()
      .then((accessToken) => loginRefresh(accessToken))
      .then((newAccessToken) => {
        login(newAccessToken);
      })
      .catch((res) => {
        console.error(res);
      });
  }, []);

  useEffect(() => {
    if (!isMobile) setIsFilterFavorite(false);
  }, [isMobile]);

  useEffect(() => {
    if (authStatus === "login") {
      const value = localStorage.getItem("isExceptEmptyRestaurant");

      if (value !== null) {
        setIsExceptEmptyRestaurant(JSON.parse(value));
      } else {
        localStorage.setItem("isExceptEmptyRestaurant", JSON.stringify(isExceptEmptyRestaurant));
      }
    }
  }, [authStatus]);

  return (
    <>
      <Container id="root-layout">
        <Header />
        <Content>{children}</Content>
      </Container>
      <Modals />
    </>
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
