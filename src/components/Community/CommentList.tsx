import styled from "styled-components";
import { Comment as CommentType } from "types";
import Comment from "components/Community/Comment";
import InfiniteScrollable from "components/general/InfiniteScrollable";

interface CommentsProps {
  comments: CommentType[];
  fetch: (size: number, page: number) => Promise<void>;
  update: (id: number) => void;
  hasNext: boolean;
}

export default function CommentList({ comments, fetch, update, hasNext }: CommentsProps) {
  return (
    <Container>
      <InfiniteScrollable fetchMoreData={fetch} hasNext={hasNext}>
        {comments.map((comment, i) => (
          <Comment key={i} comment={comment} update={update} />
        ))}
      </InfiniteScrollable>
    </Container>
  );
}

const Container = styled.div`
  margin-bottom: 14px;
  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;
