"use client";

import { useCallback, useState } from "react";
import { BoardHeader } from "app/community/boards/[boardId]/components/BoardHeader";
import { PostList } from "app/community/boards/[boardId]/components/PostList";
import { Post } from "types";
import { postParser } from "utils/DataUtil";
import { getPostList } from "utils/api/community";
import MobileNavigationBar from "components/general/MobileNavigationBar";
import useAuth from "hooks/UseAuth";
import useError from "hooks/useError";

export default function Boards({ boardId }: { boardId: number }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const { checkAccessToken } = useAuth();
  const { onHttpError } = useError();

  const fetchPosts = useCallback(
    (size: number, page: number) => {
      return checkAccessToken()
        .then((result: string | null) => getPostList(boardId, result ?? undefined, size, page))
        .then(({ result, hasNext }) => {
          result.forEach((post) => setPosts((prev) => [...prev, postParser(post)]));
          return hasNext;
        })
        .catch(onHttpError);
    },
    [boardId, checkAccessToken],
  );

  if (!boardId) return null;

  return (
    boardId && (
      <>
        <BoardHeader />
        <PostList posts={posts} fetch={fetchPosts} />
        <MobileNavigationBar />
      </>
    )
  );
}
