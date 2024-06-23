import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import APIendpoint from "../../constants/constants";
import { useDispatchContext, useStateContext } from "../../hooks/ContextProvider";

interface CommentWriterProps {
  postId: number;
  refetch: () => Promise<void>;
}

export default function CommentWriter({ postId, refetch }: CommentWriterProps) {
  const [commentInput, setCommentInput] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const { userInfo } = useStateContext();
  const { setLoginModal } = useDispatchContext();

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
      <Input value={commentInput} onChange={(e) => setCommentInput(e.target.value)}></Input>
      <SubmitButton onClick={submit}>등록</SubmitButton>
      <Options>
        <Option onClick={() => setIsAnonymous(!isAnonymous)}>익명</Option>
      </Options>
    </Container>
  );
}

const Container = styled.div``;
const Input = styled.input``;
const SubmitButton = styled.button``;
const Options = styled.div``;
const Option = styled.button``;
