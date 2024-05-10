import styled from "styled-components";
import { Post } from "./Post";

interface PropsPostList {
  posts: {
    title: string;
    content: string;
    likes: number;
    comments: number;
  }[];
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

const Container = styled.div`
  /* width: 664px; */
`;
const EmptyText = styled.div``;
