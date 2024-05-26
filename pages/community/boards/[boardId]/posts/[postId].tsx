import { useRouter } from "next/router";
import { GlobalStyle } from "../../../../../styles/globalstyle";
import Layout from "../../../layout";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import APIendpoint from "../../../../../constants/constants";
import { Post as PostType, Comment as CommentType, RawComment } from "../../../../../types";
import Board from "../../index";
import CommentList from "../../../../../components/Community/CommentList";
import CommentWriter from "../../../../../components/Community/CommentWriter";
import { useDispatchContext, useStateContext } from "../../../../../hooks/ContextProvider";

export default function Post() {
  const router = useRouter();
  const { boardId, postId } = router.query;
  const { userInfo } = useStateContext();
  const dispatch = useDispatchContext();

  const [post, setPost] = useState<PostType | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);

  async function fetchPost() {
    const res = await axios.get(`${APIendpoint()}/community/posts/${postId}/web`);
    const {
      board_id,
      id,
      title,
      content,
      created_at,
      updated_at,
      nickname,
      anonymous,
      available,
      is_mine,
      etc,
      like_cnt,
      comment_cnt,
      is_liked,
    } = res.data;
    setPost({
      boardId: board_id,
      id: id,
      title: title,
      content: content,
      createdAt: created_at,
      updatedAt: updated_at,
      nickname: nickname,
      anonymous: anonymous,
      available: available,
      isMine: is_mine,
      images: etc ? etc.images : etc,
      likeCount: like_cnt,
      commentCount: comment_cnt,
      isLiked: is_liked,
    });
  }
  async function fetchComments() {
    const res = await axios.get(`${APIendpoint()}/community/comments/web?post_id=${postId}`);
    res.data.result.map((comment: RawComment) => {
      const {
        post_id,
        content,
        created_at,
        updated_at,
        id,
        nickname,
        avaliable,
        anonymous,
        is_mine,
        is_liked,
        like_cnt,
      } = comment;
      setComments((prev) => [
        ...prev,
        {
          postId: post_id,
          content: content,
          createdAt: created_at,
          updatedAt: updated_at,
          id: id,
          nickname: nickname,
          avaliable: avaliable,
          anonymous: anonymous,
          isMine: is_mine,
          likeCount: like_cnt,
          isLiked: is_liked,
        },
      ]);
    });
  }
  async function fetchLike() {
    if (!userInfo.id) {
      dispatch({ type: "SET_LOGINMODAL", isLoginModal: true });
    } else if (post) {
      if (post.isLiked) {
        await axios
          .post(
            `${APIendpoint()}/community/posts/${post.id}/unlike`,
            {},
            {
              headers: {
                "authorizatoin-token": `Bearer ${localStorage.getItem("access_token")}`,
              },
            },
          )
          .then(() => setPost({ ...post, isLiked: false }));
      } else {
        await axios
          .post(
            `${APIendpoint()}/community/posts/${post.id}/like`,
            {},
            {
              headers: {
                "authorizatoin-token": `Bearer ${localStorage.getItem("access_token")}`,
              },
            },
          )
          .then(() => setPost({ ...post, isLiked: true }));
      }
    }
  }

  useEffect(() => {
    if (boardId && postId) {
      fetchPost();
      fetchComments();
    }
  }, [boardId, postId]);

  if (post) {
    return (
      <Board selectedBoardId={Number(boardId) ?? 1}>
        <Container>
          <Header>{post.nickname}</Header>
          <Content>
            <Title>{post.title}</Title>
            <Text>{post.content}</Text>
            <Photos>{post.images ? post.images.map((src) => <Photo src={src} />) : null}</Photos>
          </Content>
          <Footer>
            <LikeButton onClick={fetchLike}>공감</LikeButton>
          </Footer>
          <CommentContainer>
            ---Comments---
            <CommentList comments={comments} refetch={fetchComments} />
            <CommentWriter postId={post.id} refetch={fetchComments} />
          </CommentContainer>
        </Container>
      </Board>
    );
  } else {
    <Board selectedBoardId={Number(boardId) ?? 1}>
      <Container>포스트를 찾을 수 없어요</Container>
    </Board>;
  }
}

const Container = styled.div`
  width: 100%;
`;

const Header = styled.div``;
const Content = styled.div``;
const Title = styled.div``;
const Text = styled.div``;
const Photos = styled.div``;
const Photo = styled.img`
  width: 100%;
`;
const Footer = styled.div``;
const LikeButton = styled.button``;
const CommentContainer = styled.div``;
