import styled from "styled-components";
import { useRouter } from "next/router";
import AccountLayout from "./layout";
import { useStateContext } from "../../hooks/ContextProvider";
import useAuth from "hooks/UseAuth";
import { useEffect } from "react";
import UseProfile from "hooks/UseProfile";
import MobileNavigationBar from "components/general/MobileNavigationBar";
import useIsExceptEmpty from "hooks/UseIsExceptEmpty";

export default function Account() {
  const router = useRouter();

  const state = useStateContext();

  const { userInfo } = UseProfile();
  const { isExceptEmpty, toggleIsExceptEmpty } = useIsExceptEmpty();

  const { authStatus, authGuard } = useAuth();

  useEffect(authGuard, [authStatus]);

  const profileURL = userInfo?.image ?? "/img/default-profile.svg";
  const nickname = userInfo?.nickname ?? `ID ${userInfo?.id}`;

  return (
    <AccountLayout>
      <MobileSpace />
      <ListGroup>
        <ContentDiv
          onClick={() => {
            router.push("/account/profile");
          }}
        >
          <Profile src={profileURL} alt="프로필 이미지" />
          <ProfileText>
            {authStatus === "loading" ? "잠시만 기다려주세요..." : nickname}
          </ProfileText>
          <ArrowButton src="/img/right-arrow-grey.svg" alt="오른쪽 화살표" />
        </ContentDiv>
      </ListGroup>
      <ListGroup>
        <ContentDiv
          onClick={() => {
            router.push("/account/mypost");
          }}
        >
          <DefaultText>내가 쓴 글</DefaultText>
          <ArrowButton src="/img/right-arrow-grey.svg" alt="상세보기" />
        </ContentDiv>
      </ListGroup>
      <ListGroup>
        <ContentDiv
          onClick={() => {
            router.push("/account/restaurant");
          }}
        >
          <DefaultText isFirst={true}>식당 순서 변경</DefaultText>
          <ArrowButton src="/img/right-arrow-grey.svg" alt="상세보기" />
        </ContentDiv>
        <BreakLine />
        <ContentDiv
          onClick={() => {
            router.push("/account/restaurant/favorite");
          }}
        >
          <DefaultText>즐겨찾기 식당 순서 변경</DefaultText>
          <ArrowButton src="/img/right-arrow-grey.svg" alt="상세보기" />
        </ContentDiv>
        <BreakLine />
        <ContentDiv>
          <DefaultText>메뉴 없는 식당 숨기기 </DefaultText>
          {isExceptEmpty ? (
            <CheckButton
              src="/img/account/hide-circle-active.svg"
              alt="활성화"
              onClick={toggleIsExceptEmpty}
            />
          ) : (
            <CheckButton
              src="/img/account/hide-circle-inactive.svg"
              alt="비활성화"
              onClick={toggleIsExceptEmpty}
            />
          )}
        </ContentDiv>
        <BreakLine />
        <ContentDiv
          onClick={() => {
            router.push("/account/user");
          }}
        >
          <DefaultText isLast={true}>계정관리</DefaultText>
          <ArrowButton src="/img/right-arrow-grey.svg" alt="상세보기" />
        </ContentDiv>
      </ListGroup>
      <ListGroup isLast={true}>
        <ContentDiv
          onClick={() => {
            router.push("/account/inquiry");
          }}
        >
          <InquiryText>1:1 문의하기</InquiryText>
        </ContentDiv>
      </ListGroup>
      <MobileNavigationBar />
    </AccountLayout>
  );
}

const MobileSpace = styled.div`
  height: 24px;

  @media (min-width: 768px) {
    display: none;
  }
`;

const ListGroup = styled.div<{ isLast?: boolean }>`
  cursor: pointer;
  background-color: #ffffff;
  width: 544px;
  margin-bottom: ${(props) => (props.isLast ? "0" : "19px")};
  border: 1px solid #e8e8e8;
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
  cursor: pointer;
`;

const Profile = styled.img`
  width: 48.17px;
  height: 48.17px;
  margin: 11px 0 11px 16px;
  border-radius: 50%;
  object-fit: cover;
`;

const Text = styled.span`
  display: inline-block;
  margin: 11.5px 0 11.5px 13px;
  line-height: 23px;
  font-size: 16px;
  font-weight: 400;
  color: black;

  @media (max-width: 768px) {
    margin-left: 16px;
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
  margin-left: 13px;
  font-size: 16px;
  font-weight: 700;
  color: #ff9522;

  @media (max-width: 768px) {
    margin-left: 16px;
  }
`;

const BreakLine = styled.hr`
  border: 0;
  height: 1px;
  background: #e8e8e8;
  margin: 0 6px;
`;

const Button = styled.img`
  margin-left: auto;
`;

const ArrowButton = styled(Button)`
  width: 6.25px;
  height: 10px;
  margin-right: 15.47px;
`;

const CheckButton = styled(Button)`
  width: 19px;
  height: 19px;
  margin-right: 12.22px;
`;
