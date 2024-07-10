import { useCallback } from "react";
import { useStateContext, useDispatchContext } from "../../../hooks/ContextProvider";
import AccountLayout from "../layout";
import styled from "styled-components";
import { useRouter } from "next/router";
import UseAccessToken from "hooks/UseAccessToken";
import { deleteAccount } from "utils/api/auth";

export default function UserSetting() {
  const router = useRouter();
  const state = useStateContext();
  const { setLoginStatus, setLoginModal } = useDispatchContext();
  const { loginStatus } = state;
  const { getAccessToken } = UseAccessToken();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setLoginStatus(!!localStorage.getItem("access_token"));
    router.push(`/`);
  };

  const handleExit = () => {
    const confirmExit = window.confirm(
      "앱 계정을 삭제합니다. \n 이 계정으로 등록된 리뷰 정보들도 모두 함께 삭제됩니다.",
    );
    if (!confirmExit) return;

    if (loginStatus === false) {
      router.push(`/`);
      setLoginModal(true);
    }

    return getAccessToken()
      .then((accessToken) => {
        deleteAccount(accessToken);
      })
      .then(() => {
        localStorage.removeItem("access_token");
        setLoginStatus(!!localStorage.getItem("access_token"));
        router.push(`/`);
      })
      .catch((e) => {
        console.error(e);
        router.push(`/account/user`);
      });
  };

  return (
    <AccountLayout>
      <Container>
        <Title>계정 관리</Title>
        <Box>
          <Item onClick={handleLogout}>로그아웃</Item>
          <Item onClick={handleExit}>회원 탈퇴</Item>
        </Box>
      </Container>
    </AccountLayout>
  );
}

const Container = styled.div`
  background-color: white;
`;

const Title = styled.div``;

const Box = styled.div``;

const Item = styled.div`
  cursor: pointer;
`;
