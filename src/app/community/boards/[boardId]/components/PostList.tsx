import styled from "styled-components";
import { Post } from "app/community/boards/[boardId]/components/Post";
import { Post as PostType } from "types";
import InfiniteScrollable from "components/general/InfiniteScrollable";
import { useEffect, useState } from "react";
import { LoadingAnimation } from "styles/globalstyle";

interface PropsPostList {
  posts: PostType[];
  fetch: (size: number, page: number) => Promise<boolean | void>;
}

export function PostList({ posts, fetch }: PropsPostList) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <InfiniteScrollable
      fetchMoreData={(size: number, page: number) => {
        if (isLoading) return Promise.resolve();
        else return fetch(size, page);
      }}
      setIsLoading={setIsLoading}
    >
      {posts.length >= 1 ? (
        // available(신고 많이 받으면 false)한 경우만 보여지게 합니다.
        posts
          .filter((post) => post.available === true)
          .map((post, i) => <Post key={i} post={post} />)
      ) : (
        <>
          {isLoading ? (
            <EmptyText> 불러오는 중입니다 </EmptyText>
          ) : (
            <EmptyText> 내가 쓴 글이 없어요 </EmptyText>
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
  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  color: #a6a6a6;

  @media (max-width: 768px) {
    height: 100%;
    color: var(--Color-Foundation-gray-600, #989aa0);
    font-size: var(--Font-size-15, 15px);
    font-weight: var(--Font-weight-bold, 700);
  }
`;
