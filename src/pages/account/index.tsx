import styled from "styled-components";
import axios from "axios";
import APIendpoint from "../../constants/constants";
import { useRouter } from "next/router";
import AccountLayout from "./layout";
import { useEffect, useState } from "react";
import { useStateContext, useDispatchContext } from "../../hooks/ContextProvider";

export default function Account() {
  const router = useRouter();

  const [isLoading, setLoading] = useState(false);

  const state = useStateContext();
  const { setLoginModal } = useDispatchContext();
  const { loginStatus, userInfo } = state;

  useEffect(() => {
    if (loginStatus === false) {
      router.push(`/`);
      setLoginModal(true);
      return;
    }
  }, []);

  const nickname = !userInfo.nickname ? `ID ${userInfo.id}` : userInfo.nickname;

  return (
    <AccountLayout>
      <Container>
        <Nickname
          onClick={() => {
            router.push("/account/nickname");
          }}
        >
          {isLoading ? "잠시만 기다려주세요..." : nickname}
        </Nickname>

        <MyPost
          onClick={() => {
            router.push("/account/mypost");
          }}
        >
          내가 쓴 글
        </MyPost>

        <Package>
          <FirstDiv
            onClick={() => {
              router.push("/account/restaurant");
            }}
          >
            식당 순서 변경
          </FirstDiv>
          <MiddleDiv
            onClick={() => {
              router.push("/account/restaurant/favorite");
            }}
          >
            즐겨찾기 식당 순서 변경
          </MiddleDiv>
          <MiddleDiv>메뉴 없는 식당 숨기기</MiddleDiv>
          <LastDiv
            onClick={() => {
              router.push("/account/user");
            }}
          >
            계정관리
          </LastDiv>
        </Package>

        <Inquiry
          onClick={() => {
            router.push("/account/inquiry");
          }}
        >
          1:1 문의하기
        </Inquiry>
      </Container>
    </AccountLayout>
  );
}

const Container = styled.div``;

const Box = styled.div`
  cursor: pointer;
`;

const Nickname = styled(Box)``;
const MyPost = styled(Box)``;

const Package = styled.div``;
const FirstDiv = styled(Box)``;
const MiddleDiv = styled(Box)``;
const LastDiv = styled(Box)``;

const Inquiry = styled(Box)``;
