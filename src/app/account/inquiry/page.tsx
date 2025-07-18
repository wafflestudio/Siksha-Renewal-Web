"use client";
import { useRouter } from "next/navigation";
import AccountLayout from "../layout";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useStateContext } from "providers/ContextProvider";
import { setInquiry } from "utils/api/voc";
import MobileSubHeader from "components/general/MobileSubHeader";
import useAuth from "hooks/UseAuth";

export default function Inquiry() {
  const router = useRouter();
  const state = useStateContext();
  const { userInfo } = state;

  const { getAccessToken, authStatus, authGuard } = useAuth();

  useEffect(authGuard, [authStatus]);

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
      <MobileSubHeader title="1:1 문의하기" handleBack={() => router.push("/account")} />
      <Container>
        <Title>1:1 문의하기</Title>
        <MobileBox>
          <Icon src="/img/comment.svg" alt="내용 작성" />
          <Description>문의할 내용을 남겨주세요.</Description>
        </MobileBox>
        <UserBox>
          <Profile src={userInfo?.image ?? "/img/default-profile.svg"} alt="프로필 이미지" />
          <Nickname>{userInfo?.nickname ?? `ID ${userInfo?.id}`}</Nickname>
        </UserBox>
        <InquireBox>
          <TextArea value={voc} onChange={handleTextAreaChange} />
          <WordCnt>{`${voc.length} 자 / 500 자`}</WordCnt>
        </InquireBox>
        <ButtonBox>
          <ButtonCancel onClick={handleCancel}>취소</ButtonCancel>
          <ButtonConfirm onClick={handlePost}>전송하기</ButtonConfirm>
        </ButtonBox>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 701px;
  background-color: white;
  border: 1px solid #e8e8e8;
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
  color: #ff9522;

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

const Icon = styled.img`
  width: 18px;
  height: 18px;
`;

const Description = styled.p`
  text-align: center;
  margin: 0;
  margin-left: 10px;
  font-size: 20px;
  font-weight: 700;
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
`;

const InquireBox = styled.div`
  margin: 10.95px 23px 0 23px;
  width: 658px;
  height: 378.11px;

  @media (max-width: 768px) {
    width: calc(100% - 56px);
    margin-left: 28px;
    margin-right: 28px;
    height: 280px;
  }
`;
const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 15.73px 16px;
  box-sizing: border-box;
  background-color: #fafafa;
  border: 0;
  border-radius: 8px;
  resize: none;

  &:focus {
    outline: none;
  }
`;
const WordCnt = styled.div`
  width: 650px;
  margin-top: -26.46px;
  padding-right: 35.95px;
  text-align: right;
  font-size: 11px;
  font-weight: 400;
  line-height: 12.48px;
  color: #707070;

  @media (max-width: 768px) {
    position: absolute;
    right: 0;
    padding-right: 35px;
  }
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
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
  margin-top: 66.38px;
  width: 324px;
  height: 46px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  cursor: pointer;
`;

const ButtonCancel = styled(Button)`
  background-color: #eeeeee;
  color: #8e8e8e;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ButtonConfirm = styled(Button)`
  background-color: #ff9522;
  color: #ffffff;
  margin-left: 14px;

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
  }
`;
