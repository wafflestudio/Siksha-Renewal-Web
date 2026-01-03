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
<<<<<<< HEAD
    else
      openModal(DeleteModal, {
        type: "review",
        onClose: () => {},
        onSubmit: () =>
          getAccessToken()
            .then((accessToken) => deleteReview(reviewId, accessToken))
            .then(() => {
              openModal(ConfirmModal, {
                type: "delete",
                onClose: () => {
                  router.refresh();
                },
              });
              router.refresh();
            })
            .catch(onHttpError),
      });
=======
    else openModal(DeleteModal, {
      type: "review",
      onClose: () => { },
      onSubmit: () =>
        getAccessToken()
          .then((accessToken) => deleteReview(reviewId, accessToken))
          .then(() => {
            openModal(ConfirmModal, {
              type: "delete",
              onClose: () => { router.refresh(); },
            });
            router.refresh();
          })
          .catch(onHttpError),
    });
>>>>>>> origin
  };

  return {
    removeReview,
<<<<<<< HEAD
    updateReview,
  };
}
=======
    updateReview
  };
}
>>>>>>> origin
