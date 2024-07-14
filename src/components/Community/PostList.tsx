import styled from "styled-components";
import { Post } from "components/Community/Post";
import { Post as PostType } from "types";
import InfiniteScrollable from "components/general/InfiniteScrollable";

interface PropsPostList {
  posts: PostType[];
  fetch: (size: number, page: number) => Promise<void>;
  hasNext: boolean;
}

export function PostList({ posts, fetch, hasNext }: PropsPostList) {
  return (
    <InfiniteScrollable fetchMoreData={fetch} hasNext={hasNext}>
      {posts ? (
        posts.map((post, i) => <Post key={i} post={post} />)
      ) : (
        <EmptyText> 게시물이 없습니다 </EmptyText>
      )}
    </InfiniteScrollable>
  );
}

const Container = styled.div``;
const EmptyText = styled.div``;
