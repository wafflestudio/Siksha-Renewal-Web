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
import useError from "hooks/useError";
import useModals from "hooks/UseModals";

export default function useCommentActions(boardId: number, postId: number) {
  const { authStatus, checkAccessToken, getAccessToken } = useAuth();
  const { openLoginModal } = useModals();
  const { onHttpError } = useError();

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
    if (authStatus === "logout") return Promise.resolve(openLoginModal());
    else
      return getAccessToken()
        .then((accessToken) => setComment(postId, commentInput, isAnonymous, accessToken))
        .then((res) => setComments((prev) => [...prev, commentParser(res.data)]))
        .catch(onHttpError);
  };

  const deleteComment = (id: number) => {
    if (authStatus === "logout") return Promise.resolve(openLoginModal());
    else
      return getAccessToken()
        .then((accessToken) => removeComment(id, accessToken))
        .then(() => setComments((prev) => prev.filter((comment) => comment.id !== id)))
        .catch(onHttpError);
  };

  const toggleLike = (id: number, isLiked: boolean) => {
    if (authStatus === "logout") return Promise.resolve(openLoginModal());
    else {
      const handleLikeAction = isLiked ? setCommentUnlike : setCommentLike;
      return getAccessToken()
        .then((accessToken) => handleLikeAction(id, accessToken))
        .then(({ isLiked, likeCount }) => {
          setComments((prev) =>
            prev.map((comment) =>
              comment.id === id ? { ...comment, isLiked, likeCount } : comment,
            ),
          );
        })
        .catch(onHttpError);
    }
  };

  useEffect(() => {
    if (boardId && postId) setComments([]);
  }, [boardId, postId]);

  return { comments, isError, fetchComments, addComment, deleteComment, toggleLike };
}
