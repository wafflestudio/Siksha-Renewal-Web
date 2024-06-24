import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import APIendpoint from "constants/constants";
import { useDispatchContext, useStateContext } from "hooks/ContextProvider";

interface CommentWriterProps {
  postId: number;
  refetch: () => Promise<void>;
}

export default function CommentWriter({ postId, refetch }: CommentWriterProps) {
  const [commentInput, setCommentInput] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const { userInfo } = useStateContext();
  const { setLoginModal } = useDispatchContext();

  const checkBoxImg = isAnonymous ? "/img/radio-full.svg" : "/img/radio-empty.svg";
  async function submit() {
    if (!userInfo.id) {
      setLoginModal(true);
    } else {
      await axios.post(
        `${APIendpoint()}/community/comments`,
        {
          post_id: postId,
          content: commentInput,
          anonymous: isAnonymous,
        },
        { headers: { "authorization-token": `Bearer ${localStorage.getItem("access_token")}` } },
      );
      await refetch();
      setCommentInput("");
      setIsAnonymous(false);
    }
  }

  return (
    <Container>
      <MobileAnonymousButton isAnonymous={isAnonymous}>
        <Option src={checkBoxImg} onClick={() => setIsAnonymous(!isAnonymous)} />
        <span>익명</span>
      </MobileAnonymousButton>
      <CommentInput
        placeholder="댓글을 입력하세요."
        value={commentInput}
        onChange={(e) => setCommentInput(e.target.value)}
      ></CommentInput>
      <Options>
        <DesktopAnonymousButton isAnonymous={isAnonymous}>
          <Option src={checkBoxImg} onClick={() => setIsAnonymous(!isAnonymous)} />
          <span>익명</span>
        </DesktopAnonymousButton>
        <SubmitButton onClick={submit}>올리기</SubmitButton>
      </Options>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 100%;
`;
const CommentInput = styled.input`
  box-sizing: border-box;
  width: 100%;

  border: none;
  border-radius: 8px;
  background-color: #f8f8f8;
  padding: 14px 130px 14px 14.5px;

  font-weight: 400;
  font-size: 16px;
  line-height: 18px;

  outline: none;
  &::placeholder {
    color: #b7b7b7;
  }
  @media (max-width: 768px) {
    font-size: 12px;
    line-height: 13.62px;
    padding: 13px 73px 13px 60px;
  }
`;

const Options = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);

  padding: 0 6.5px;

  display: flex;
  align-items: center;
`;

const AnonymousButton = styled.button<{ isAnonymous?: boolean }>`
  background-color: transparent;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  border: none;
  color: ${(props) => (props.isAnonymous ? "#ff9522" : "#575757")};
  font-weight: ${(props) => (props.isAnonymous ? 700 : 400)};
  cursor: pointer;
  & span {
    padding-left: 8px;
    @media (max-width: 768px) {
      padding-left: 5px;
    }
  }
`;
const MobileAnonymousButton = styled(AnonymousButton)`
  display: none;
  position: absolute;
  height: 100%;
  font-size: 10px;
  line-height: 11.35px;
  padding-left: 11px;
  @media (max-width: 768px) {
    display: flex;
  }
`;
const DesktopAnonymousButton = styled(AnonymousButton)`
  font-size: 14px;
  line-height: 16px;
  padding-right: 18px;
  @media (max-width: 768px) {
    display: none;
  }
`;
const Option = styled.img``;
const SubmitButton = styled.button`
  background-color: #ff9522;
  color: #fff;
  padding: 8.5px 11.5px;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;

  @media (max-width: 768px) {
    padding: 6.5px 11px;
  }
`;
