import { useEffect, useState } from "react";
import styled from "styled-components";
import { BoardHeader } from "components/Community/BoardHeader";
import { PostList } from "components/Community/PostList";

import APIendpoint from "constants/constants";
import axios from "axios";
import { Post, RawPost } from "types";
import Board from ".";
import { useRouter } from "next/router";
import { useStateContext } from "hooks/ContextProvider";
import { postParser } from "utils/DataUtil";

export default function Posts() {
  const router = useRouter();
  const { boardId } = router.query;
  const { loginStatus } = useStateContext();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    function setParedPosts(post: RawPost) {
      setPosts((prev) => [...prev, postParser(post)]);
    }

    async function fetchPosts() {
      const apiUrl = loginStatus
        ? `${APIendpoint()}/community/posts?board_id=${boardId}`
        : `${APIendpoint()}/community/posts/web?board_id=${boardId}`;
      const config = loginStatus
        ? { headers: { "authorization-token": `Bearer ${localStorage.getItem("access_token")}` } }
        : {};

      try {
        await axios.get(apiUrl, config).then((res) => {
          res.data.result.map(setParedPosts);
        });
      } catch (e) {
        console.error(e);
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
