import ConfirmModal from "app/components/ConfirmModal";
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
          // TODO: 리뷰 삭제 API 완성되면 주석 해제
          // .then((accessToken) => deleteReview(reviewId, accessToken))
          .then(() => {
            openModal(ConfirmModal, {
              type: "delete",
              onClose: () => { router.refresh(); },
            });
          })
          .catch(onHttpError),
    });
  };

  return {
    removeReview,
    updateReview
  };
}