import { useEffect, useState } from "react";
import styled from "styled-components";
import { BoardHeader } from "../../../components/Community/BoardHeader";
import { PostList } from "../../../components/Community/PostList";
import { BoardMenu } from "../../../components/Community/BoardMenu";

import Layout from "../layout";

// 가짜 데이터 import
import APIendpoint from "../../../constants/constants";
import { useStateContext } from "../../../hooks/ContextProvider";
import LoginModal from "../../../components/Auth/LoginModal";
import axios from "axios";
import { Board as BoardType, Post, RawPost, RawBoard } from "../../../types";

export default function Board() {
  const [boardId, setBoardId] = useState(1);
  const [boards, setBoards] = useState<BoardType[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  async function fetchBoards() {
    const res = await axios.get(`${APIendpoint()}/community/boards`);
    setBoards([]);
    res.data.map((board: RawBoard) => {
      const { created_at, updated_at, id, type, name, description } = board;
      setBoards((prev) => [
        ...prev,
        {
          createdAt: created_at,
          updatedAt: updated_at,
          id: id,
          type: type,
          name: name,
          description: description,
        },
      ]);
    });
  }
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

  useEffect(() => {
    fetchPosts();
    fetchBoards();
  }, [boardId]);

  return (
    <Layout>
      <Container>
        <BoardMenu boardId={boardId} setBoardId={setBoardId} boards={boards} />
        <BoardHeader />
        <PostList posts={posts} />
      </Container>
    </Layout>
  );
}

const Container = styled.div``;
