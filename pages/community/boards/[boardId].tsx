import { useEffect, useState } from "react";
import styled from "styled-components";
import { BoardHeader } from "../../../components/Community/BoardHeader";
import { PostList } from "../../../components/Community/PostList";

import APIendpoint from "../../../constants/constants";
import axios from "axios";
import { Post, RawPost } from "../../../types";
import Board from ".";
import { useRouter } from "next/router";
import { useStateContext } from "../../../hooks/ContextProvider";

export default function Posts() {
  const router = useRouter();
  const { boardId } = router.query;
  const { loginStatus } = useStateContext();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      if (loginStatus) {
        const res = await axios.get(`${APIendpoint()}/community/posts?board_id=${boardId}`, {
          headers: { "authorization-token": `Bearer ${localStorage.getItem("access_token")}` },
        });
        setPosts([]);
        res.data.result.map(update);
      } else {
        const res = await axios.get(`${APIendpoint()}/community/posts/web?board_id=${boardId}`, {});
        setPosts([]);
        res.data.result.map(update);
      }
      function update(post: RawPost) {
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
        } = post;
        setPosts((prev) => [
          ...prev,
          {
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
          },
        ]);
      }
    }

    if (boardId) {
      fetchPosts();
    }
  }, [boardId]);

  return (
    <Board selectedBoardId={Number(boardId) ?? 1}>
      <>
        <BoardHeader />
        <PostList posts={posts} />
      </>
    </Board>
  );
}

const Container = styled.div``;
