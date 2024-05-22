import styled from "styled-components";
import axios from "axios";
import APIendpoint from "../../constants/constants";
import { useRouter } from "next/router";
import Layout from "../community/layout";
import AccountLayout from "./accountLayout";
import { useCallback, useEffect, useState } from "react";
import { useStateContext, useDispatchContext } from "../../hooks/ContextProvider";
import { log } from "util";

export default function Account() {
  const router = useRouter();

  const [isLoading, setLoading] = useState(false);

  const state = useStateContext();
  const dispatch = useDispatchContext();
  const { loginStatus, userInfo } = state;
  const setLoginStatus = useCallback(
    () =>
      dispatch({
        type: "SET_LOGINSTATUS",
        loginStatus: !!localStorage.getItem("access_token"),
      }),
    [dispatch],
  );
  const setLoginModal = useCallback(
    () =>
      dispatch({
        type: "SET_LOGINMODAL",
        isLoginModal: true,
      }),
    [dispatch],
  );
  const setUserInfo = useCallback(
    (id: number, nickname: string) =>
      dispatch({
        type: "SET_USERINFO",
        userInfo: { id, nickname },
      }),
    [dispatch],
  );

  useEffect(() => {
    setLoginStatus();

    if (loginStatus === false) {
      router.push(`/`);
      setLoginModal();
      return;
    } else {
      const access_token = localStorage.getItem("access_token");

      async function fetchUserInfo() {
        setLoading(true);
        try {
          const res = await axios
            .get(`${APIendpoint()}/auth/me`, {
              headers: { "authorization-token": `Bearer ${access_token}` },
            })
            .then((res) => {
              setUserInfo(res.data.id, res.data.nickname);
            });
        } catch (e) {
          console.log(e);
          router.push(`/`);
        } finally {
          setLoading(false);
        }
      }

      fetchUserInfo();
    }
  }, [setLoading]);

  const nickname = !userInfo.nickname ? `ID ${userInfo.id}` : userInfo.nickname;

  return (
    <>
      <AccountLayout>
        <Container>
          <Nickname
            onClick={() => {
              router.push("/account/nickname");
            }}
          >
            {isLoading ? '잠시만 기다려주세요...' : nickname}
          </Nickname>

          <MyPost
            onClick={() => {
              router.push("/account/nickname");
            }}
          >
            내가 쓴 글
          </MyPost>

          <Package>
            <FirstDiv
              onClick={() => {
                router.push("/account/restaurant");
              }}
            >
              식당 순서 변경
            </FirstDiv>
            <MiddleDiv
              onClick={() => {
                router.push("/account/restaurant/favorite");
              }}
            >
              즐겨찾기 식당 순서 변경
            </MiddleDiv>
            <MiddleDiv>메뉴 없는 식당 숨기기</MiddleDiv>
            <LastDiv
              onClick={() => {
                router.push("/account/user");
              }}
            >
              계정관리
            </LastDiv>
          </Package>

          <Inquiry>1:1 문의하기</Inquiry>
        </Container>
      </AccountLayout>
    </>
  );
}

const Container = styled.div``;

const Box = styled.div`
  cursor: pointer;
`;

const Nickname = styled(Box)``;
const MyPost = styled(Box)``;

const Package = styled.div``;
const FirstDiv = styled(Box)``;
const MiddleDiv = styled(Box)``;
const LastDiv = styled(Box)``;

const Inquiry = styled(Box)``;
