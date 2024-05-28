import styled from "styled-components";
import { Comment as CommentType } from "../../types";
import { useDispatchContext, useStateContext } from "../../hooks/ContextProvider";
import axios from "axios";
import APIendpoint from "../../constants/constants";

interface CommentProps {
  comment: CommentType;
  refetch: () => Promise<void>;
}

export default function Comment({ comment, refetch }: CommentProps) {
  const { nickname, content, likeCount, createdAt, updatedAt, id, isLiked } = comment;

  const { userInfo } = useStateContext();
  const dispatch = useDispatchContext();

  async function fetchLike() {
    if (!userInfo.id) {
      dispatch({ type: "SET_LOGINMODAL", isLoginModal: true });
    } else {
      if (isLiked) {
        await axios
          .post(
            `${APIendpoint()}/community/comments/${id}/unlike`,
            {},
            {
              headers: {
                "authorization-token": `Bearer ${localStorage.getItem("access_token")}`,
              },
            },
          )
          .then(() => refetch());
      } else {
        await axios
          .post(
            `${APIendpoint()}/community/comments/${id}/like`,
            {},
            {
              headers: {
                "authorization-token": `Bearer ${localStorage.getItem("access_token")}`,
              },
            },
          )
          .then(() => refetch());
      }
    }
  }

  return (
    <Container>
      <User>{nickname}</User>
      <Content>{content}</Content>
      <Date>{updatedAt ? updatedAt : createdAt}</Date>
      <Likes>{likeCount}</Likes>
      <LikeButton onClick={fetchLike}>공감</LikeButton>
      {isLiked ? "liked!" : "not liked"}
    </Container>
  );
}

const Container = styled.div``;
const User = styled.div``;
const Content = styled.div``;
const Date = styled.div``;
const Likes = styled.div``;

const LikeButton = styled.button``;
