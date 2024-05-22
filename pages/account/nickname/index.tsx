import AccountLayout from "../accountLayout";
import styled from "styled-components";
import axios from "axios";
import APIendpoint from "../../../constants/constants";
import { useState } from "react";

export default function Setting_Nickname({userInfo}) {
  const [nickname, setNickname] = useState("");
  const [newNickname, setNewNickname] = useState("");

  const handleSetClick = async () => {
    const access_token = localStorage.getItem("access_token");
    
}

  return (
    <>
      <AccountLayout>
        <Container>
          <Title>닉네임 설정</Title>
          <InputBox>
            <Input placeholder="닉네임" type="text"></Input>
            <Button>완료</Button>
          </InputBox>
        </Container>
      </AccountLayout>
    </>
  );
}

const Title = styled.div``;

const Container = styled.div``;

const InputBox = styled.div``;

const Input = styled.input``;

const Button = styled.button``;
