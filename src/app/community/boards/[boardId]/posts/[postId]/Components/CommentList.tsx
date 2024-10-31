import styled from "styled-components";
import { Comment as CommentType } from "types";
import Comment from "app/community/boards/[boardId]/posts/[postId]/Components/Comment";
import InfiniteScrollable from "components/general/InfiniteScrollable";

interface CommentsProps {
  comments: CommentType[];
  fetch: (size: number, page: number) => Promise<boolean | void>;
  update: (id: number) => void;
}

export default function CommentList({ comments, fetch, update }: CommentsProps) {
  return (
    <Container>
      <InfiniteScrollable fetchMoreData={fetch}>
        {comments.map((comment, i) => (
          <Comment key={i} comment={comment} update={update} />
        ))}
      </InfiniteScrollable>
    </Container>
  );
}

const Container = styled.div``;
