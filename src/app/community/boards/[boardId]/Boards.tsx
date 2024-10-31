"use client";

import { useEffect, useState } from "react";
import { BoardHeader } from "app/community/boards/components/BoardHeader";
import { PostList } from "app/community/boards/components/PostList";
import { Post } from "types";
import Board from "../layout";
import { useSearchParams } from "next/navigation";
import { postParser } from "utils/DataUtil";
import { getPostList } from "utils/api/community";
import MobileNavigationBar from "components/general/MobileNavigationBar";
import useAuth from "hooks/UseAuth";

export default function Boards({ boardId }: { boardId: number }) {
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<Post[]>([]);

  const { checkAccessToken } = useAuth();

  const fetchPosts = (size: number, page: number) => {
    return checkAccessToken()
      .then((result: string | null) => getPostList(boardId, result ?? undefined, size, page))
      .then(({ result, hasNext }) => {
        result.forEach((post) => setPosts((prev) => [...prev, postParser(post)]));
        return hasNext;
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    console.log(searchParams);
    if (boardId) setPosts((_) => []);
    console.log("boardId", boardId);
  }, [boardId]);

  if (boardId)
    return (
      <Board selectedBoardId={boardId} showBoardMenu={true}>
        <BoardHeader />
        <PostList posts={posts} fetch={fetchPosts} />
        <MobileNavigationBar />
      </Board>
    );
}
