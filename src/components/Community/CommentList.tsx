import styled from "styled-components";
import { Comment as CommentType } from "types";
import Comment from "components/Community/Comment";

interface CommentsProps {
  comments: CommentType[];
  refetch: () => Promise<void>;
}

export default function CommentList({ comments, refetch }: CommentsProps) {
  return (
    <Container>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} refetch={refetch} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  margin-bottom: 14px;
  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;
