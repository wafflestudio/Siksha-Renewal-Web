import { useEffect, useState } from "react";
import { deletePost, getPost, setPostLike, setPostUnlike } from "utils/api/community";
import { Post as PostType } from "types";
import { postParser } from "utils/DataUtil";
import useAuth from "hooks/UseAuth";
import useModals from "hooks/UseModals";
import DeleteModal from "../components/DeleteModal";
import { useRouter } from "next/navigation";
import { ReportModal } from "../components/ReportModal";

export default function usePostActions(boardId: number, postId: number) {
  const router = useRouter();
  const { authStatus, getAccessToken, checkAccessToken } = useAuth();
  const { openModal, openLoginModal } = useModals();

  const [post, setPost] = useState<PostType | null>(null);

  const [isError, setIsError] = useState<boolean>(false);

  const reportPost = (postId: number) => {
    if (authStatus === "logout") openLoginModal();
    else openModal(ReportModal, { type: "post", targetID: postId, onClose: () => {} });
  };

  const updatePost = (postId: number) => {
    router.push(`/community/write/?postId=${postId}`);
  };

  const fetchPost = () => {
    return checkAccessToken()
      .then((result: string | null) => getPost(Number(postId), result ?? undefined))
      .then((data) => setPost(postParser(data)))
      .catch((e) => {
        console.error(e);
        setIsError(true);
      });
  };

  const fetchLike = () => {
    if (authStatus === "logout") openLoginModal();
    else if (post) {
      const handleLikeAction = post.isLiked ? setPostUnlike : setPostLike;
      getAccessToken()
        .then((accessToken) => handleLikeAction(post.id, accessToken))
        .then(({ isLiked, likeCount }) => {
          setPost({
            ...post,
            isLiked: isLiked,
            likeCount: likeCount,
          });
        })
        .catch((e) => {
          console.error(e);
          setIsError(true);
        });
    }
  };

  const removePost = (postId: number) => {
    if (authStatus === "logout") openLoginModal();
    else
      openModal(DeleteModal, {
        type: "post",
        onClose: () => {},
        onSubmit: () =>
          getAccessToken()
            .then((accessToken) => deletePost(postId, accessToken))
            .then(() => router.back())
            .catch((e) => console.error(e)),
      });
  };

  useEffect(() => {
    if (boardId && postId) fetchPost();
  }, [boardId, postId]);

  return { post, isError, fetchPost, fetchLike, removePost, reportPost, updatePost };
}
