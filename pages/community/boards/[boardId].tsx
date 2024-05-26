import { useEffect, useState } from "react";
import styled from "styled-components";
import { BoardHeader } from "../../../components/Community/BoardHeader";
import { PostList } from "../../../components/Community/PostList";

import APIendpoint from "../../../constants/constants";
import axios from "axios";
import { Post, RawPost } from "../../../types";
import Board from ".";
import { useRouter } from "next/router";

export default function Posts() {
  const router = useRouter();
  const { boardId } = router.query;
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const res = await axios.get(`${APIendpoint()}/community/posts/web?board_id=${boardId}`, {});
      setPosts([]);
      res.data.result.map((post: RawPost) => {
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
      });
    }
    fetchPosts();
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
