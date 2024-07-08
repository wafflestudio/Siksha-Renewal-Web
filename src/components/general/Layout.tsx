import axios from "axios";
import Header from "components/Header";
import APIendpoint from "constants/constants";
import { useDispatchContext, useStateContext } from "hooks/ContextProvider";
import useIsMobile from "hooks/UseIsMobile";
import React, { useEffect } from "react";
import styled from "styled-components";

interface LayoutProps {
  children: JSX.Element;
}

export default function Layout({ children }: LayoutProps) {
  const state = useStateContext();
  const { setLoginStatus, setUserInfo, setIsFilterFavorite, setIsExceptEmptyRestaurant } =
    useDispatchContext();
  const isMobile = useIsMobile();

  const { loginStatus, isExceptEmptyRestaurant } = state;

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    axios
      .post(
        `${APIendpoint()}/auth/refresh`,
        {},
        { headers: { "authorization-token": `Bearer ${access_token}` } },
      )
      .then((res) => {
        localStorage.setItem("access_token", res.data.access_token);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

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
    <Container>
      <Header />
      {children}
    </Container>
  );
}

const Container = styled.div``;
