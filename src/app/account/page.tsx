"use client";

import styled from "styled-components";
import { useRouter } from "next/navigation";
import AccountLayout from "./layout";
import useAuth from "hooks/UseAuth";
import { useEffect } from "react";
import MobileNavigationBar from "components/general/MobileNavigationBar";
import useIsExceptEmpty from "hooks/UseIsExceptEmpty";
import UseProfile from "hooks/UseProfile";
import UseCurrentTheme from "hooks/UseCurrentTheme";
import RightArrowMobileIcon from "assets/icons/right-arrow-mobile.svg";
import HideCircleIcon from "assets/icons/hide-circle.svg";

export default function Account() {
  const router = useRouter();
  const currentTheme = UseCurrentTheme();

  const { userInfo } = UseProfile();
  const { isExceptEmpty, toggleIsExceptEmpty } = useIsExceptEmpty();

  const { authStatus, authGuard } = useAuth();

  useEffect(authGuard, [authStatus]);

  const profileURL =
    userInfo?.image ?? currentTheme === "dark"
      ? "/img/default-profile-dark.svg"
      : "/img/default-profile.svg";
  const nickname = userInfo?.nickname;

  return (
    <>
      <ListGroup>
        <ContentDiv
          onClick={() => {
            router.push("/account/profile");
          }}
        >
          <Profile src={profileURL} alt="프로필 이미지" />
          <ProfileText>{userInfo ? nickname : "잠시만 기다려주세요..."}</ProfileText>
          <ArrowButton aria-label="상세보기" />
        </ContentDiv>
      </ListGroup>
      <ListGroup>
        <ContentDiv
          onClick={() => {
            router.push("/account/mypost");
          }}
        >
          <DefaultText>내가 쓴 글</DefaultText>
          <ArrowButton aria-label="상세보기" />
        </ContentDiv>
      </ListGroup>
      <ListGroup>
        <ContentDiv
          onClick={() => {
            router.push("/account/restaurant");
          }}
        >
          <DefaultText isFirst={true}>식당 순서 변경</DefaultText>
          <ArrowButton aria-label="상세보기" />
        </ContentDiv>
        <BreakLine />
        <ContentDiv
          onClick={() => {
            router.push("/account/restaurant/favorite");
          }}
        >
          <DefaultText>즐겨찾기 식당 순서 변경</DefaultText>
          <ArrowButton aria-label="상세보기" />
        </ContentDiv>
        <BreakLine />
        <ContentDiv>
          <DefaultText>메뉴 없는 식당 숨기기 </DefaultText>
          <CheckButton
            isActive={isExceptEmpty}
            onClick={toggleIsExceptEmpty}
            aria-label={isExceptEmpty ? "활성화" : "비활성화"}
          />
        </ContentDiv>
        <BreakLine />
        <ContentDiv
          onClick={() => {
            router.push("/account/user");
          }}
        >
          <DefaultText isLast={true}>계정관리</DefaultText>
          <ArrowButton aria-label="상세보기" />
        </ContentDiv>
      </ListGroup>
      <ListGroup isLast={true}>
        <ContentDiv
          onClick={() => {
            router.push("/account/inquiry");
          }}
        >
          <InquiryText>1:1 문의하기</InquiryText>
          <ArrowButton aria-label="상세보기" />
        </ContentDiv>
      </ListGroup>
      <MobileNavigationBar />
    </>
  );
}

const ArrowButton = () => {
  return (
    <ArrowButtonWrapper>
      <RightArrowMobileIcon />
    </ArrowButtonWrapper>
  );
};
const ArrowButtonWrapper = styled.div`
  width: 6.25px;
  height: 10px;
  margin-right: 15.47px;
  margin-left: auto;
  color: var(--Color-Foundation-gray-500);
  margin-bottom: 7px;

  @media (max-width: 768px) {
    margin-right: 13.75px;
  }
`;

const CheckButton = ({ isActive, onClick }: { isActive: boolean; onClick: () => void }) => {
  return (
    <CheckButtonWrapper isActive={isActive} onClick={onClick}>
      <HideCircleIcon />
    </CheckButtonWrapper>
  );
};

const CheckButtonWrapper = styled.div<{ isActive: boolean }>`
  width: 19px;
  height: 19px;
  margin-right: 12.22px;
  margin-left: auto;
  color: ${({ isActive }) =>
    isActive ? "var(--Color-Foundation-orange-500)" : "var(--Color-Foundation-gray-500)"};
  @media (max-width: 768px) {
    margin-right: 15.5px;
  }
`;

const ListGroup = styled.div<{ isLast?: boolean }>`
  cursor: pointer;
  background-color: var(--Color-Foundation-base-white-5);
  width: 544px;
  margin-bottom: ${(props) => (props.isLast ? "0" : "19px")};
  border: 1px solid var(--Color-Foundation-gray-200-2);
  border-radius: 8px;

  @media (max-width: 768px) {
    width: calc(100dvw - 40px);
  }
`;

const ContentDiv = styled.button`
  width: 100%;
  border: none;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
  padding-left: 16px;
  cursor: pointer;
`;

const Profile = styled.img`
  width: 48.17px;
  height: 48.17px;
  margin: 11px 0 11px 0.58px;
  border-radius: 50%;
  object-fit: cover;

  @media (max-width: 768px) {
    margin-left: -5px;
  }
`;

const Text = styled.span`
  display: inline-block;
  margin: 11.5px 0;
  line-height: 23px;
  font-size: 16px;
  font-weight: 400;
  color: var(--Color-Foundation-base-black);

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const ProfileText = styled(Text)`
  margin-left: 11px;
  font-weight: 700;
`;

const DefaultText = styled(Text)<{ isFirst?: boolean; isLast?: boolean }>`
  margin-top: ${(props) => (props.isFirst ? "13px" : "10.5px")};
  margin-bottom: ${(props) => (props.isLast ? "13px" : "10.5px")};
`;

const InquiryText = styled(Text)`
  font-size: 16px;
  font-weight: 700;
  color: var(--Color-Foundation-orange-500);
`;

const BreakLine = styled.hr`
  border: 0;
  height: 1px;
  background: var(--Color-Foundation-gray-200-2);
  margin: 0 6px;
`;
