import LoginModal from "components/Auth/LoginModal";
import { ModalDispatchContext } from "providers/ModalsProvider";
import { ComponentType, useContext } from "react";

export default function useModals() {
  const { open, close } = useContext(ModalDispatchContext);

  const openModal = <P extends {}>(Component: ComponentType<P>, props: P) => {
    open(Component, props);
  };

  const closeModal = <P extends {}>(Component: ComponentType<P>) => {
    close(Component);
  };

  const openLoginModal = (props = { onClose: () => {}, onSubmit: () => {} }) => {
    openModal(LoginModal, props);
  };

  return {
    openModal,
    closeModal,
    openLoginModal,
  };
}
