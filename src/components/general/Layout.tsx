import Header from "components/Header";
import { useDispatchContext } from "hooks/ContextProvider";
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
  const { setIsFilterFavorite } = useDispatchContext();
  const isMobile = useIsMobile();
  const { getAccessToken, login } = useAuth();

  UseProfile();

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
    min-width: 260px;
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
