import { useEffect, useState } from "react";
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
  const { checkAccessToken } = UseAccessToken();

  useEffect(() => {
    function setParsedPosts(post: RawPost) {
      setPosts((prev) => [...prev, postParser(post)]);
    }

    const fetchPosts = () => {
      return checkAccessToken()
        .then((result: string | null) => getPostList(Number(boardId), result ?? undefined))
        .then(({ result }) => {
          result.forEach((post) => {
            setParsedPosts(post);
          });
        })
        .catch((e) => {
          console.error(e);
        });
    };

    if (boardId) {
      fetchPosts();
    }
  }, [boardId]);

  return (
    <Board selectedBoardId={Number(boardId) ?? 1}>
      <>
        <BoardHeader />
        <PostList posts={posts} />
        <MobileNavigationBar />
      </>
    </Board>
  );
}

const Container = styled.div``;
