import { AxiosError } from "axios";
import LoginModal from "components/Auth/LoginModal";
import ErrorModal from "components/general/ErrorModal";
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

  /**
   * 에러 모달을 여는 함수입니다.
   * @function openErrorModal
   * @param {Error | AxiosError} error - 제공받을 에러 객체.
   * @param {object} [options] - 에러 함수에 대해 custom할 수 있는 부분입니다.
   * @param {string} [options.message] - 에러 함수에 출력되는 메시지를 수정할 수 있습니다.
   * @param {boolean} options.isUserFail - 유저의 잘못으로 인해 발생한 오류인지 출력하는 부분입니다. 스펙 변경을 대비해 남겨둔 부분이니 사용하지 마세요.
   * @param {function} [options.onClose] - 모달 창이 닫힐때 수행할 callback을 정의힙니다.
   * @param {function} [options.onRetry] - 서버 문제로 인해 발생한 오류일 때 재시도 callback을 정의합니다. 스펙 변경을 대비해 남겨둔 부분이니 사용하지 마세요.
   */
  const openErrorModal = (
    error: Error | AxiosError,
    options: {
      message?: string;
      isUserFail: boolean;
      onClose?: () => void;
      onRetry?: () => void;
    } = {
      isUserFail: false,
    },
  ) => {
    const defaultMessage = "알 수 없는 오류가 발생했습니다.";

    const isAxiosError = error instanceof AxiosError;

    const message = options.message
      ? options.message
      : isAxiosError
        ? error.response?.data.message ?? defaultMessage
        : defaultMessage;
    const status = options.isUserFail ? 400 : isAxiosError ? error.response?.status ?? 500 : 500;

    openModal(ErrorModal, {
      code: status,
      message: message,
      onClose: () => {
        options.onClose ? options.onClose() : router.back();
        closeModal(ErrorModal);
      },
      onRetry: () => {
        options.onRetry ? options.onRetry() : router.refresh();
        closeModal(ErrorModal);
      },
    });
  };

  return {
    openModal,
    closeModal,
    openLoginModal,
    openErrorModal,
  };
}
