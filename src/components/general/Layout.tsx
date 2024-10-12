import Header from "components/general/Header";
import { useDispatchContext } from "context/ContextProvider";
import useAuth from "hooks/UseAuth";
import useIsMobile from "hooks/UseIsMobile";
import UseProfile from "hooks/UseProfile";
import React, { useEffect } from "react";
import styled from "styled-components";
import { loginRefresh } from "utils/api/auth";
import Modals from "./Modals";
import { useRouter } from "next/router";
import Toast from "./Toast";

interface LayoutProps {
  children: JSX.Element;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const { boardId } = router.query;

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
      .catch((error) => {
        const { message } = error;
        if (message !== "Login required") console.error(error);
      });
  }, []);

  useEffect(() => {
    if (!isMobile) setIsFilterFavorite(false);
  }, [isMobile]);

  // write page로 router.back하지 않도록
  useEffect(() => {
    router.beforePopState(({ as }) => {
      if (as.includes("/write")) {
        if (boardId) router.push(`/community/boards/${boardId}`);
        else router.push("/");
        return false;
      }

      return true;
    });

    return () => {
      router.beforePopState(() => true);
    };
  }, []);

  return (
    <>
      <Container id="root-layout">
        <Header />
        <Content>{children}</Content>
      </Container>
      <Modals />
      <Toast />
    </>
  );
}

const Container = styled.div`
  width: 100%;
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
  }
`;
