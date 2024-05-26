import styled from "styled-components";
import { Post } from "./Post";
import { Post as PostType } from "../../types";

interface PropsPostList {
  posts: PostType[];
}

export function PostList({ posts }: PropsPostList) {
  return (
    <Container>
      {posts ? (
        posts.map((post, i) => <Post key={i} post={post} />)
      ) : (
        <EmptyText> 게시물이 없습니다 </EmptyText>
      )}
    </Container>
  );
}

const Container = styled.div``;
const EmptyText = styled.div``;
