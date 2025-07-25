"use client";

import Header from "components/general/Header";
import { useDispatchContext } from "providers/ContextProvider";
import useAuth from "hooks/UseAuth";
import useIsMobile from "hooks/UseIsMobile";
import UseProfile from "hooks/UseProfile";
import React, { useEffect } from "react";
import styled from "styled-components";
import { loginRefresh } from "utils/api/auth";
import Modals from "./Modals";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { analytics } from "utils/api/firebase";
import { logEvent } from "firebase/analytics";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const boardId = searchParams?.get("boardId");
  const pathname = usePathname();

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

  useEffect(() => {
    if (analytics) {
      logEvent(analytics, "page_view", {
        page_path: pathname,
      });
      logEvent(analytics, "test_event");
    } else {
    }
  }, [pathname]);

  // write page로 router.back하지 않도록
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const as = event.state?.url || "";
      if (as.includes("/write")) {
        if (boardId) router.push(`/community/boards/${boardId}`);
        else router.push("/");
        event.preventDefault();
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

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
    display: flex;
    flex: 1;
  }
`;
