"use client";
import { useRouter } from "next/navigation";
import AccountLayout from "../layout";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useStateContext } from "providers/ContextProvider";
import { setInquiry } from "utils/api/voc";
import MobileSubHeader from "components/general/MobileSubHeader";
import useAuth from "hooks/UseAuth";
import UseCurrentTheme from "hooks/UseCurrentTheme";
import CommentReportIcon from "assets/icons/comment_report.svg";

export default function Inquiry() {
  const router = useRouter();
  const state = useStateContext();
  const { userInfo } = state;

  const { getAccessToken, authStatus, authGuard } = useAuth();
  const { defaultProfileURL } = UseCurrentTheme();

  useEffect(authGuard, [authGuard]);

  const [voc, setVoc] = useState("");

  const handleTextAreaChange = (e) => {
    if (e.target.value.length <= 500) {
      setVoc(e.target.value);
    }
  };

  const handleCancel = () => {
    setVoc("");
    router.push(`/account`);
  };

  const handlePost = () => {
    if (voc === "") return;

    return getAccessToken()
      .then((accessToken) => setInquiry(voc, accessToken))
      .then((res) => {
        console.log(res);
        setVoc("");
        router.push(`/account`);
      })
      .catch((e) => {
        console.error(e);
        router.push(`/account/inquiry`);
      });
  };

  return (
    <>
      <MobileSubHeader
        title="1:1 문의하기"
        containerColor="secondary"
        handleBack={() => router.push("/account")}
      />
      <Container>
        <Title>1:1 문의하기</Title>
        <MobileBox>
          <StyledCommentReportIcon />
          <Description>문의할 내용을 남겨주세요.</Description>
        </MobileBox>
        <UserBox>
          <Profile src={userInfo?.image ?? defaultProfileURL} alt="프로필 이미지" />
          <Nickname>{userInfo?.nickname ?? `ID ${userInfo?.id}`}</Nickname>
        </UserBox>
        <InquireBox>
          <TextArea
            value={voc}
            onChange={handleTextAreaChange}
            placeholder="문의할 내용을 입력해주세요."
          />
          <WordCnt>{`${voc.length}/150자`}</WordCnt>
        </InquireBox>
        <ButtonBox>
          <ButtonCancel onClick={handleCancel}>취소</ButtonCancel>
          <ButtonConfirm onClick={handlePost}>완료</ButtonConfirm>
        </ButtonBox>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 701px;
  background-color: var(--SemanticColor-Background-Secondary);
  border-radius: 8px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;
const Title = styled.div`
  margin: 24.04px 0 0 23.5px;
  font-size: 20px;
  font-weight: 700;
  color: var(--Color-Foundation-gray-900);

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileBox = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 44px;
    margin-bottom: 30px;
  }
`;

const StyledCommentReportIcon = styled(CommentReportIcon)`
  color: var(--Color-Foundation-gray-700);
`;

const Description = styled.p`
  text-align: center;
  margin: 0;
  margin-left: 10px;
  color: var(--Color-Foundation-base-black);
  font-size: 18px;
  font-weight: 800;
  line-height: 140%;
`;

const UserBox = styled.div`
  margin-top: 29.92px;
  display: flex;
  align-items: left;

  @media (max-width: 768px) {
    margin-top: 0;
  }
`;

const Profile = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 23.5px;
  border-radius: 50%;

  @media (max-width: 768px) {
    margin-left: 28px;
  }
`;

const Nickname = styled.div`
  margin-left: 8px;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: -0.3px;
  color: var(--Color-Foundation-gray-900);
  display: flex;
  align-items: center;
`;

const InquireBox = styled.div`
  margin: 10.95px 23px 0 23px;
  width: 658px;
  height: 378.11px;

  display: inline-grid;
  grid-template-areas: "stack";

  @media (max-width: 768px) {
    width: calc(100% - 56px);
    margin-left: 28px;
    margin-right: 28px;
    height: 280px;
  }
`;

const TextArea = styled.textarea`
  grid-area: stack;
  width: 100%;
  height: 100%;
  padding: 15.73px 16px;
  box-sizing: border-box;
  background-color: var(--SemanticColor-Background-Tertiary);
  border: 0;
  border-radius: 6px;
  resize: none;
  &::placeholder {
    color: var(--SemanticColor-Text-Bubble);
  }

  &::placeholder {
    color: var(--Color-Foundation-gray-600);
    font-size: 15px;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: -0.3px;
  }

  &:focus {
    outline: none;
  }
`;

const WordCnt = styled.div`
  grid-area: stack;
  align-self: end;
  justify-self: end;
  /* width: 650px; */
  margin-right: 8px;
  margin-bottom: 16px;
  text-align: right;
  font-size: 13px;
  font-weight: 400;
  line-height: 12.48px;
  color: var(--Color-Foundation-gray-700);
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 33.1px;

  @media (max-width: 768px) {
    margin-top: auto;
    padding: 0 16px;
  }
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 324px;
  height: 46px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  cursor: pointer;
`;

const ButtonCancel = styled(Button)`
  background-color: var(--SemanticColor-Background-Tertiary);
  color: var(--Color-Foundation-gray-600);

  @media (max-width: 768px) {
    display: none;
  }
`;

const ButtonConfirm = styled(Button)`
  background-color: var(--Color-Foundation-orange-500);
  color: var(--SemanticColor-Text-Button);
  margin-left: 14px;

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
  }
`;

const DesktopText = styled.span`
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileText = styled.span`
  display: none;

  @media (max-width: 768px) {
    display: inline;
  }
`;
