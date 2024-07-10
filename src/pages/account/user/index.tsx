import { useStateContext, useDispatchContext } from "../../../hooks/ContextProvider";
import AccountLayout from "../layout";
import styled from "styled-components";
import { useRouter } from "next/router";
import axios from "axios";
import APIendpoint from "../../../constants/constants";

export default function UserSetting() {
  const router = useRouter();
  const state = useStateContext();
  const { setLoginStatus, setLoginModal } = useDispatchContext();
  const { loginStatus } = state;

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setLoginStatus(!!localStorage.getItem("access_token"));
    router.push(`/`);
  };

  const handleExit = async () => {
    const confirmExit = window.confirm(
      "앱 계정을 삭제합니다. \n 이 계정으로 등록된 리뷰 정보들도 모두 함께 삭제됩니다.",
    );
    if (!confirmExit) return;

    if (loginStatus === false) {
      router.push(`/`);
      setLoginModal(true);
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
            setLoginStatus(!!localStorage.getItem("access_token"));
            router.push(`/`);
          });
      } catch (e) {
        console.log(e);
        router.push(`/account/user`);
      }
    }
  };

  return (
    <AccountLayout>
      <MobileSpace />
      <Container>
        <Title>계정 관리</Title>
        <ContentDiv onClick={handleLogout}>
          <LogoutText>로그아웃</LogoutText>
          <ArrowButton src="/img/right-arrow-grey.svg" />
        </ContentDiv>
        <BreakLine />
        <ContentDiv onClick={handleExit}>
          <WithdrawalText>회원 탈퇴</WithdrawalText>
          <ArrowButton src="/img/right-arrow-grey.svg" />
        </ContentDiv>
      </Container>
    </AccountLayout>
  );
}

const MobileSpace = styled.div`
  height: 24px;

  @media (min-width: 768px) {
    display: none;
  }
`;

const Container = styled.div`
  width: 544px;
  background-color: white;
  border: 1px solid #e8e8e8;
  border-radius: 8px;

  @media (max-width: 768px) {
    width: calc(100dvw - 40px);
  }
`;

const Title = styled.div`
  margin: 24.57px 0 0 22.45px;
  font-size: 20px;
  font-weight: 700;
  color: #ff9522;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ContentDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

const Text = styled.span`
  display: inline-block;
  margin-left: 28px;
  line-height: 23px;
  font-size: 16px;
  font-weight: 400;

  @media (max-width: 768px) {
    margin-left: 16px;
  }
`;

const LogoutText = styled(Text)`
  margin-top: 30.43px;
  margin-bottom: 9.97px;

  @media (max-width: 768px) {
    margin-top: 8px;
    margin-bottom: 8px;
  }
`;

const WithdrawalText = styled(Text)`
  margin-top: 10.97px;
  margin-bottom: 14px;
  color: #8a8a8a;

  @media (max-width: 768px) {
    margin-top: 8px;
    margin-bottom: 8px;
  }
`;

const BreakLine = styled.hr`
  border: 0;
  height: 1px;
  background: #e8e8e8;
  margin: 0 6px;
`;

const ArrowButton = styled.img`
  margin-left: auto;
  width: 6.25px;
  height: 10px;
  margin-right: 15.47px;

  @media (max-width: 768px) {
    display: none;
  }
`;
