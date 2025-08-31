import DeleteModal from "app/components/DeleteModal";
import useAuth from "hooks/UseAuth";
import useError from "hooks/useError";
import useModals from "hooks/UseModals";
import { useRouter } from "next/navigation";
import { deleteReview } from "utils/api/reviews";

export default function useReviewActions() {
  const router = useRouter();
  const { authStatus, getAccessToken, checkAccessToken } = useAuth();
  const { openModal, openLoginModal } = useModals();
  const { onHttpError } = useError();

  const updateReview = (menuId: number, reviewId: number) => {
    router.push(`/menu/${menuId}/reviews/write?reviewId=${reviewId}`);
  };

  const removeReview = (reviewId: number) => {
    if (authStatus === "logout") openLoginModal();
    else openModal(DeleteModal, {
      type: "review",
      onClose: () => { },
      onSubmit: () =>
        getAccessToken()
          .then((accessToken) => deleteReview(reviewId, accessToken))
          .then(() => router.back()) // 아직 action 미정
          .catch(onHttpError),
    });
  };

  return {
    removeReview,
    updateReview
  };
}