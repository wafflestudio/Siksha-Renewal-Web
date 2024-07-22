import AccountLayout from "../layout";
import styled from "styled-components";
import { useState } from "react";
import { useStateContext } from "../../../hooks/ContextProvider";
import { useRouter } from "next/router";
import UseAccessToken from "hooks/UseAccessToken";
import { updateMyData } from "utils/api/auth";
import useModals from "hooks/UseModals";

export default function SettingNickname() {
  const [newNickname, setNewNickname] = useState("");
  const { getAccessToken } = UseAccessToken();

  const router = useRouter();
  const state = useStateContext();
  const { loginStatus } = state;
  const { openLoginModal } = useModals();

  const handleSetClick = () => {
    if (newNickname === null) return;
    else if (loginStatus === false) {
      router.push(`/`);
      openLoginModal();
    }

    const formData = new FormData();
    formData.append("nickname", newNickname);

    return getAccessToken()
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
          />
          <Button onClick={handleSetClick}>완료</Button>
        </InputBox>
      </Container>
    </AccountLayout>
  );
}

const Container = styled.div`
  width: 533px;
  background-color: white;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
`;
const Title = styled.div`
  margin: 24px 0 0 22.48px;
  font-size: 20px;
  font-weight: 700;
  color: #ff9522;
`;

const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 22.48px 24px 22.48px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  overflow: hidden; // border 잘림 해결
`;

const Input = styled.input`
  width: 433px;
  height: 40px;
  font-weight: 700;
  border: none;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  width: 52px;
  height: 34px;
  background-color: #ff9522;
  border: none;
  border-radius: 8px;
  margin-right: 7.52px;
  font-size: 15px;
  font-weight: 400;
  color: #ffffff;
  line-height: 14px;
  cursor: pointer;
`;
