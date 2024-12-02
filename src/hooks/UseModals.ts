import { AxiosError } from "axios";
import LoginModal from "components/Auth/LoginModal";
import ErrorModal from "components/general/ErrorModal";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { ModalDispatchContext } from "providers/ModalsProvider";
import { ComponentType, useContext } from "react";

export default function useModals() {
  const { open, close } = useContext(ModalDispatchContext);
  const router = useRouter();

  const openModal = <P extends {}>(Component: ComponentType<P>, props: P) => {
    open(Component, props);
  };

  const closeModal = <P extends {}>(Component: ComponentType<P>) => {
    close(Component);
  };

  const openLoginModal = (props = { onClose: () => {}, onSubmit: () => {} }) => {
    openModal(LoginModal, props);
  };

  const openErrorModal = (error: Error | AxiosError) => {
    const defaultMessage = "알 수 없는 오류가 발생했습니다.";

    const isAxiosError = error instanceof AxiosError;

    const message = isAxiosError ? error.response?.data.message ?? defaultMessage : defaultMessage;
    const status = isAxiosError ? error.response?.status ?? 500 : 500;

    openModal(ErrorModal, {
      code: status,
      message: message,
      onClose: () => {
        router.back();
        closeModal(ErrorModal);
      },
      onRetry: () => window.location.reload(),
    });
  };

  return {
    openModal,
    closeModal,
    openLoginModal,
    openErrorModal,
  };
}
