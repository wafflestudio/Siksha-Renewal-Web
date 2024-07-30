import styled from "styled-components";
import { Post } from "components/Community/Post";
import { Post as PostType } from "types";
import InfiniteScrollable from "components/general/InfiniteScrollable";
import useAuth from "hooks/UseAuth";
import { useState } from "react";
import { useStateContext } from "hooks/ContextProvider";
import { LoadingAnimation } from "styles/globalstyle";

interface PropsPostList {
  posts: PostType[];
  fetch: (size: number, page: number) => Promise<boolean | void>;
}

export function PostList({ posts, fetch }: PropsPostList) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <InfiniteScrollable fetchMoreData={fetch} setIsLoading={setIsLoading}>
      {posts.length >= 1 ? (
        posts.map((post, i) => <Post key={i} post={post} />)
      ) : (
        <>
          {isLoading ? (
            <EmptyText> 불러오는 중입니다 </EmptyText>
          ) : (
            <EmptyText> 게시물이 없습니다 </EmptyText>
          )}
        </>
      )}
    </InfiniteScrollable>
  );
}

const EmptyText = styled.div`
  ${LoadingAnimation}
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 160.84px;
  text-align: center;
  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  color: #a6a6a6;

  @media (max-width: 768px) {
    height: calc(100dvh - 60px);
  }
`;
