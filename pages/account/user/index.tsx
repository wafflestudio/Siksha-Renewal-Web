import { useCallback } from "react";
import { useStateContext, useDispatchContext } from "../../../hooks/ContextProvider";
import AccountLayout from "../layout";
import styled from "styled-components";
import { useRouter } from "next/router";
import axios from "axios";
import APIendpoint from "../../../constants/constants";

export default function Setting_User() {
  const router = useRouter();
  const state = useStateContext();
  const dispatch = useDispatchContext();
  const { loginStatus } = state;
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

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setLoginStatus();
    router.push(`/`);
  };

  const handleExit = async () => {
    const confirmExit = window.confirm(
      "앱 계정을 삭제합니다. \n 이 계정으로 등록된 리뷰 정보들도 모두 함께 삭제됩니다.",
    );
    if (!confirmExit) return;

    if (loginStatus === false) {
      router.push(`/`);
      setLoginModal();
    } else {
      const access_token = localStorage.getItem("access_token");

      try {
        await axios
          .delete(`${APIendpoint()}/auth/`, {
            headers: { "authorization-token": `Bearer ${access_token}` },
          })
          .then((res) => {
            console.log(res);
            localStorage.removeItem("access_token");
            setLoginStatus();
            router.push(`/`);
          });
      } catch (e) {
        console.log(e);
        router.push(`/account/user`);
      }
    }
  };

  return (
    <>
      <AccountLayout>
        <Container>
          <Title>계정 관리</Title>
          <Box>
            <Item onClick={handleLogout}>로그아웃</Item>
            <Item onClick={handleExit}>회원 탈퇴</Item>
          </Box>
        </Container>
      </AccountLayout>
    </>
  );
}

const Container = styled.div``;

const Title = styled.div``;

const Box = styled.div``;

const Item = styled.div`
  cursor: pointer;
`;
