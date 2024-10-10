import { useEffect, useState } from "react";
import styled from "styled-components";
import { BoardHeader } from "components/Community/BoardHeader";
import { PostList } from "components/Community/PostList";

import { Post } from "types";
import Board from ".";
import { useRouter } from "next/router";
import { postParser } from "utils/DataUtil";
import { getPostList } from "utils/api/community";
import MobileNavigationBar_Legacy from "components/general/MobileNavigationBar_Legacy";
import useAuth_Legacy from "hooks/UseAuth_Legacy";

export default function Posts() {
  const router = useRouter();
  const { boardId } = router.query;
  const [posts, setPosts] = useState<Post[]>([]);

  const { checkAccessToken } = useAuth_Legacy();

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
        <MobileNavigationBar_Legacy />
      </Board>
    );
}

const Container = styled.div``;
