import { useEffect, useState } from "react";
import {
  getCommentList,
  setCommentLike,
  setCommentUnlike,
  deleteComment as removeComment,
  setComment,
} from "utils/api/community";
import { Comment as CommentType } from "types";
import { commentParser } from "utils/DataUtil";
import useAuth from "hooks/UseAuth";

export default function useCommentActions(boardId: number, postId: number) {
  const { checkAccessToken, getAccessToken } = useAuth();

  const [comments, setComments] = useState<CommentType[]>([]);
  const [isError, setIsError] = useState<boolean>(false);

  const fetchComments = (size: number, page: number) => {
    return checkAccessToken()
      .then((result: string | null) =>
        getCommentList(Number(postId), result ?? undefined, size, page),
      )
      .then(({ result, hasNext }) => {
        const newComments = result.map(commentParser);
        setComments((prev) => [...prev, ...newComments]);
        return hasNext;
      })
      .catch((e) => {
        console.error(e);
        setIsError(true);
      });
  };

  const addComment = (postId: number, commentInput: string, isAnonymous: boolean) => {
    return checkAccessToken().then((accessToken: string | null) => {
      if (accessToken === null) throw new Error("invalid access token");
      else
        return setComment(postId, commentInput, isAnonymous, accessToken)
          .then((res) => setComments((prev) => [...prev, commentParser(res.data)]))
          .catch((e) => console.error(e));
    });
  };

  const deleteComment = (id: number) =>
    getAccessToken()
      .then((accessToken) => removeComment(id, accessToken))
      .then(() => setComments((prev) => prev.filter((comment) => comment.id !== id)))
      .catch((e) => console.error(e));

  const toggleLike = (id: number, isLiked: boolean) => {
    const handleLikeAction = isLiked ? setCommentUnlike : setCommentLike;

    return getAccessToken()
      .then((accessToken) => handleLikeAction(id, accessToken))
      .then(({ isLiked, likeCount }) => {
        setComments((prev) =>
          prev.map((comment) => (comment.id === id ? { ...comment, isLiked, likeCount } : comment)),
        );
      })
      .then(() => console.log(comments))
      .catch(console.error);
  };

  useEffect(() => {
    if (boardId && postId) setComments([]);
  }, [boardId, postId]);

  return { comments, isError, fetchComments, addComment, deleteComment, toggleLike };
}
