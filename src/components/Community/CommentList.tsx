import styled from "styled-components";
import { Comment as CommentType } from "../../types";
import Comment from "./Comment";

interface CommentsProps {
  comments: CommentType[];
  refetch: () => Promise<void>;
}

export default function CommentList({ comments, refetch }: CommentsProps) {
  return (
    <Container>
      {comments.map((comment) => (
        <Comment comment={comment} refetch={refetch} />
      ))}
    </Container>
  );
}

const Container = styled.div``;
