import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { BoardHeader } from "components/Community/BoardHeader";
import { PostList } from "components/Community/PostList";

import { Post, RawPost } from "types";
import Board from ".";
import { useRouter } from "next/router";
import { useStateContext } from "hooks/ContextProvider";
import MobileNavigationBar from "components/MobileNavigationBar";
import { postParser } from "utils/DataUtil";
import { getPostList } from "utils/api/community";
import UseAccessToken from "hooks/UseAccessToken";

export default function Posts() {
  const router = useRouter();
  const { boardId } = router.query;
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasNextPosts, setHasNextPosts] = useState(true);

  const { checkAccessToken } = UseAccessToken();

  const fetchPosts = (size: number, page: number) => {
    return checkAccessToken()
      .then((result: string | null) =>
        getPostList(Number(boardId), result ?? undefined, size, page),
      )
      .then(({ result, hasNext }) => {
        setHasNextPosts(hasNext);
        result.forEach((post) => {
          setPosts((prev) => [...prev, postParser(post)]);
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    if (boardId) {
      fetchPosts(10, 1);
    }
  }, [boardId]);

  return (
    <Board selectedBoardId={Number(boardId) ?? 1}>
      <>
        <BoardHeader />
        <PostList posts={posts} fetch={fetchPosts} hasNext={hasNextPosts} />
        <MobileNavigationBar />
      </>
    </Board>
  );
}

const Container = styled.div``;
