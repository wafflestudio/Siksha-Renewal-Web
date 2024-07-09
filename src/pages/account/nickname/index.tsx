import AccountLayout from "../layout";
import styled from "styled-components";
import { useState } from "react";
import { useStateContext, useDispatchContext } from "../../../hooks/ContextProvider";
import { useRouter } from "next/router";
import UseAccessToken from "hooks/UseAccessToken";
import { updateMyData } from "utils/api/auth";

export default function Setting_Nickname({ userInfo }) {
  const [newNickname, setNewNickname] = useState("");
  const { getAccessToken } = UseAccessToken();

  const router = useRouter();
  const state = useStateContext();
  const { setLoginModal } = useDispatchContext();
  const { loginStatus } = state;

  const handleSetClick = async () => {
    if (newNickname === null) return;
    else if (loginStatus === false) {
      router.push(`/`);
      setLoginModal(true);
    }

    const formData = new FormData();
    formData.append("nickname", newNickname);

    getAccessToken()
      .then((accessToken) => {
        updateMyData(formData, accessToken);
      })
      .then(() => {
        router.push(`/account`);
      })
      .catch((e) => console.error(e));
  };

  return (
    <AccountLayout>
      <Container>
        <Title>닉네임 설정</Title>
        <InputBox>
          <Input
            placeholder="닉네임"
            type="text"
            value={newNickname}
            onChange={(e) => setNewNickname(e.target.value)}
          ></Input>
          <Button onClick={handleSetClick}>완료</Button>
        </InputBox>
      </Container>
    </AccountLayout>
  );
}

const Title = styled.div``;

const Container = styled.div``;

const InputBox = styled.div``;

const Input = styled.input``;

const Button = styled.button``;
