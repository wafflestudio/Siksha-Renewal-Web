import { useEffect, useState } from "react";
import styled from "styled-components";
import { BoardHeader } from "components/Community/BoardHeader";
import { PostList } from "components/Community/PostList";

import { Post } from "types";
import Board from ".";
import { useRouter } from "next/router";
import { postParser } from "utils/DataUtil";
import { getPostList } from "utils/api/community";
import MobileNavigationBar from "components/general/MobileNavigationBar";
import useAuth from "hooks/UseAuth";

export default function Posts() {
  const router = useRouter();
  const { boardId } = router.query;
  const [posts, setPosts] = useState<Post[]>([]);

  const { checkAccessToken } = useAuth();

  const fetchPosts = (size: number, page: number) => {
    return checkAccessToken()
      .then((result: string | null) =>
        getPostList(Number(boardId), result ?? undefined, size, page),
      )
      .then(({ result, hasNext }) => {
        result.forEach((post) => setPosts((prev) => [...prev, postParser(post)]));
        return hasNext;
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    if (boardId) setPosts((_) => []);
  }, [boardId]);

  if (boardId)
    return (
      <Board selectedBoardId={Number(boardId)} showBoardMenu={true}>
        <BoardHeader />
        <PostList posts={posts} fetch={fetchPosts} />
        <MobileNavigationBar />
      </Board>
    );
}

const Container = styled.div``;
