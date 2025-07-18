"use client";
import AccountLayout from "../layout";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { deleteAccount } from "utils/api/auth";
import { useEffect, useState } from "react";
import MobileSubHeader from "components/general/MobileSubHeader";
import useAuth from "hooks/UseAuth";
import useError from "hooks/useError";

export default function UserSetting() {
  const router = useRouter();
  const { authStatus, getAccessToken, authGuard, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const { onHttpError } = useError();

  useEffect(() => {
    if (authStatus === "login") {
      setIsLoading(false);
    }
    if (isLoading) authGuard();
  }, [authStatus]);

  const handleLogout = () => {
    logout();
    router.push(`/`);
  };

  const handleExit = () => {
    const confirmExit = window.confirm(
      "앱 계정을 삭제합니다. \n 이 계정으로 등록된 리뷰 정보들도 모두 함께 삭제됩니다.",
    );
    if (!confirmExit) return;

    return getAccessToken()
      .then((accessToken) => {
        deleteAccount(accessToken);
      })
      .then(handleLogout)
      .catch((e) => {
        onHttpError(e);
        router.push(`/account/user`);
      });
  };

  return (
    <>
      <MobileSubHeader title="계정관리" handleBack={() => router.push("/account")} />
      <Container>
        <Title>계정 관리</Title>
        <ContentDiv onClick={handleLogout}>
          <LogoutText>로그아웃</LogoutText>
          <ArrowButton src="/img/general/right-arrow-grey.svg" alt="로그아웃" />
        </ContentDiv>
        <BreakLine />
        <ContentDiv onClick={handleExit}>
          <WithdrawalText>회원 탈퇴</WithdrawalText>
          <ArrowButton src="/img/general/right-arrow-grey.svg" alt="로그인" />
        </ContentDiv>
      </Container>
    </>
  );
}

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
  margin-bottom: 30.43px;

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
    font-size: 15px;
  }
`;

const LogoutText = styled(Text)`
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

  margin-top: 9.97px;
  @media (max-width: 768px) {
    margin-top: 0;
  }
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
