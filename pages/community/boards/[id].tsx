import { useState } from "react";
import styled from "styled-components";
import { BoardHeader } from "../../../components/Community/BoardHeader";
import { PostList } from "../../../components/Community/PostList";
import { BoardMenu } from "../../../components/Community/BoardMenu";

import { Layout } from "../Layout";

// 가짜 데이터 import
import { boards, posts } from "../../../constants/constants";

export default function Board() {
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
