import { useRouter } from "next/router";
import AccountLayout from "../layout";
import styled from "styled-components";
import { useCallback, useState } from "react";
import { useStateContext, useDispatchContext } from "../../../hooks/ContextProvider";
import APIendpoint from "../../../constants/constants";
import axios from "axios";

export default function Inquire() {
  const router = useRouter();
  const state = useStateContext();
  const { setLoginModal } = useDispatchContext();
  const { loginStatus, userInfo } = state;

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

  const handlePost = async () => {
    if (loginStatus === false) {
      router.push(`/`);
      setLoginModal(true);
      return;
    } else {
      if (voc === "") {
        return;
      }

      const access_token = localStorage.getItem("access_token");

      try {
        await axios
          .post(
            `${APIendpoint()}/voc`,
            {
              voc: voc,
              platform: "WEB",
            },
            {
              headers: { "authorization-token": `Bearer ${access_token}` },
            },
          )
          .then((res) => {
            console.log(res);
            setVoc("");
            router.push(`/account`);
          });
      } catch (e) {
        console.log(e);
        router.push(`/account/inquiry`);
      }
    }
  };

  return (
    <AccountLayout>
      <Container>
        <Title>1:1 문의하기</Title>

        <UserBox>
          <Icon />
          <Nickname>{userInfo.nickname}</Nickname>
        </UserBox>
        <InquireBox>
          <TextArea value={voc} onChange={handleTextAreaChange} />
          <WordCnt>{`${voc.length} / 500자`}</WordCnt>
        </InquireBox>
        <BtnBox>
          <Button onClick={handleCancle}>취소</Button>
          <Button onClick={handlePost}>등록</Button>
        </BtnBox>
      </Container>
    </AccountLayout>
  );
}

const Container = styled.div``;
const Title = styled.div``;

const UserBox = styled.div``;
const Icon = styled.div``;
const Nickname = styled.div``;

const InquireBox = styled.div``;
const TextArea = styled.textarea``;
const WordCnt = styled.div``;

const BtnBox = styled.div``;
const Button = styled.div`
  cursor: pointer;
`;
