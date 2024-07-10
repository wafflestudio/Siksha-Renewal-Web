import styled from "styled-components";
import { Post } from "components/Community/Post";
import { Post as PostType } from "types";

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

const Container = styled.div`
  @media (max-width: 768px) {
    overflow: scroll;
  }
`;
const EmptyText = styled.div``;
