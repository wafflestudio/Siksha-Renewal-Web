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
        <Title>계정관리</Title>
        <ContentWrapper>
          <ContentDiv onClick={handleLogout}>
            <LogoutText>로그아웃</LogoutText>
            <ArrowButton src="/img/general/right-arrow-grey.svg" alt="로그아웃" />
          </ContentDiv>
          <BreakLine />
          <ContentDiv onClick={handleExit}>
            <WithdrawalText>회원탈퇴</WithdrawalText>
            <ArrowButton src="/img/general/right-arrow-grey.svg" alt="회원탈퇴" />
          </ContentDiv>
        </ContentWrapper>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 544px;
  background-color: #ffffff;
  border: 1px solid #e5e6e9;
  border-radius: 10px;
  padding: 24px 20px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    width: calc(100dvw - 40px);
    padding: 0;
    border: 1px solid #e8e8e8;
    border-radius: 8px;
    gap: 0;
  }
`;

const Title = styled.div`
  color: #262728;
  font-family: NanumSquareOTF;
  font-size: 18px;
  font-weight: 800;
  line-height: 140%;
  letter-spacing: -0.3px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 768px) {
    gap: 0;
  }
`;

const ContentDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const Text = styled.span`
  display: inline-block;
  line-height: 23px;
  font-size: 16px;
  font-weight: 400;

  @media (max-width: 768px) {
    margin-left: 28px;
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
  color: #f86627;

  @media (max-width: 768px) {
    margin-top: 8px;
    margin-bottom: 8px;
    color: #8a8a8a;
  }
`;

const BreakLine = styled.hr`
  border: 0;
  height: 1px;
  background: #e5e6e9;
  margin: 0;

  @media (max-width: 768px) {
    background: #e8e8e8;
    margin: 0 6px;
  }
`;

const ArrowButton = styled.img`
  margin-left: auto;
  width: 16px;
  height: 16px;

  @media (max-width: 768px) {
    display: none;
  }
`;
