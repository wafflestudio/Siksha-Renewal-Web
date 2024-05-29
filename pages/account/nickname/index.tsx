import AccountLayout from "../layout";
import styled from "styled-components";
import axios from "axios";
import APIendpoint from "../../../constants/constants";
import { useCallback, useState } from "react";
import { useStateContext, useDispatchContext } from "../../../hooks/ContextProvider";
import { log } from "console";
import { useRouter } from "next/router";

export default function Setting_Nickname({ userInfo }) {
  const [newNickname, setNewNickname] = useState("");

  const router = useRouter();
  const state = useStateContext();
  const dispatch = useDispatchContext();
  const { loginStatus } = state;
  const setLoginModal = useCallback(
    () =>
      dispatch({
        type: "SET_LOGINMODAL",
        isLoginModal: true,
      }),
    [dispatch],
  );

  const handleSetClick = async () => {
    if (loginStatus === false) {
      router.push(`/`);
      setLoginModal();
    } else {
      const access_token = localStorage.getItem("access_token");

      if (newNickname !== "") {
        let formData = new FormData();
        formData.append("nickname", newNickname);
        try {
          await axios
            .patch(`${APIendpoint()}/auth/me/profile`, formData, {
              headers: { "authorization-token": `Bearer ${access_token}` },
            })
            .then((res) => {
              console.log(res);
              router.push(`/account`);
            });
        } catch (e) {
          console.log(e);
          router.push(`/account/nickname`);
        }
      }
    }
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
