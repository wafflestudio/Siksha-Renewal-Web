import { useRouter } from "next/router";
import Header from "../../../components/Header";
import { useEffect, useMemo, useState } from "react";
import ContextProvider from "../../../hooks/ContextProvider";
import { GlobalStyle } from "../../../styles/globalstyle";
import styled from "styled-components";
import { BoardHeader } from "../../../components/Community/BoardHeader";
import { PostList } from "../../../components/Community/PostList";
import { BoardMenu } from "../../../components/Community/BoardMenu";

import { Layout } from "../Layout";

export default function Board() {
  const router = useRouter();
  const { id } = router.query;

  const posts = useMemo(() => {
    return [
      {
        title: "제목",
        content: "본문이요~",
        likes: 12,
        comments: 13,
      },
      {
        title: "두 번째 게시물이요~",
        content: "본문 한 번 더요~",
        likes: 12,
        comments: 13,
      },
      {
        title: "세 번째 게시물이요~",
        content: "본문 한 번 더요~",
        likes: 0,
        comments: 13,
      },
    ];
  }, []);
  const boards = useMemo(() => {
    return [
      {
        id: 0,
        name: "자유게시판",
      },
      {
        id: 1,
        name: "리뷰게시판",
      },
    ];
  }, []);

  const [boardId, setBoardId] = useState(0);

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
