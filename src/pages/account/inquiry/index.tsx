import { useRouter } from "next/router";
import AccountLayout from "../layout";
import styled from "styled-components";
import { useState } from "react";
import { useStateContext, useDispatchContext } from "../../../hooks/ContextProvider";
import { setInquiry } from "utils/api/voc";
import UseAccessToken from "hooks/UseAccessToken";

export default function Inquire() {
  const router = useRouter();
  const state = useStateContext();
  const { setLoginModal } = useDispatchContext();
  const { loginStatus, userInfo } = state;

  const { getAccessToken } = UseAccessToken();
  // 프로필 이미지 기능 구현 대비
  const profileURL = "/img/default-profile.svg";

  const [voc, setVoc] = useState("");

  const handleTextAreaChange = (e) => {
    if (e.target.value.length <= 500) {
      setVoc(e.target.value);
    }
  };

  const handleCancle = () => {
    setVoc("");
    router.push(`/account`);
  };

  const handlePost = () => {
    if (loginStatus === false) {
      router.push(`/`);
      setLoginModal(true);
      return;
    } else if (voc === "") return;

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
    <AccountLayout>
      <Container>
        <Title>1:1 문의하기</Title>

        <UserBox>
          <Profile src={profileURL} />
          <Nickname>{userInfo.nickname ?? `ID ${userInfo.id}`}</Nickname>
        </UserBox>
        <InquireBox>
          <TextArea value={voc} onChange={handleTextAreaChange} />
          <WordCnt>{`${voc.length} / 500자`}</WordCnt>
        </InquireBox>
        <ButtonBox>
          <ButtonCancel onClick={handleCancle}>취소</ButtonCancel>
          <ButtonConfirm onClick={handlePost}>등록</ButtonConfirm>
        </ButtonBox>
      </Container>
    </AccountLayout>
  );
}

const Container = styled.div`
  width: 701px;
  background-color: white;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
`;
const Title = styled.div`
  margin: 24.04px 0 0 23.5px;
  font-size: 20px;
  font-weight: 700;
  color: #ff9522;
`;

const UserBox = styled.div`
  margin-top: 29.92px;
  display: flex;
  align-items: left;
`;
const Profile = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 23.5px;
`;
const Nickname = styled.div`
  margin-left: 8px;
`;

const InquireBox = styled.div`
  margin: 10.95px 23px 0 23px;
  width: 658px;
  height: 378.11px;
`;
const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  background-color: #fafafa;
  border: 0;
  border-radius: 8px;
  resize: none;
`;
const WordCnt = styled.div`
  width: 635px;
  margin-top: -26.46px;
  padding-right: 35.95px;
  text-align: right;
  font-size: 11px;
  font-weight: 400;
  line-height: 12.48px;
  color: #707070;
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 33.1px;
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
`;

const ButtonConfirm = styled(Button)`
  background-color: #ff9522;
  color: #ffffff;
  margin-left: 14px;
`;
