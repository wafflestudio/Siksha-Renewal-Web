import styled from "styled-components";
import { Comment as CommentType } from "types";
import Comment from "app/community/boards/[boardId]/posts/[postId]/components/Comment";
import InfiniteScrollable from "components/general/InfiniteScrollable";

interface CommentListProps {
  comments: CommentType[];
  fetchComments: (size: number, page: number) => Promise<boolean | void>;
  deleteComment: (id: number) => Promise<void>;
  toggleLike: (id: number, isLiked: boolean) => Promise<void>;
}

export default function CommentList({
  comments,
  fetchComments,
  deleteComment,
  toggleLike,
}: CommentListProps) {
  return (
    <Container>
      <InfiniteScrollable fetchMoreData={fetchComments}>
        {comments.map((comment, i) => (
          <Comment
            key={i}
            comment={comment}
            deleteComment={deleteComment}
            toggleLike={toggleLike}
          />
        ))}
      </InfiniteScrollable>
    </Container>
  );
}

const Container = styled.div``;
