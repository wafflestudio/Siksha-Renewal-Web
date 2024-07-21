import { ModlasDispatchContext } from "context/ModalsProvider";
import { ComponentType, useContext } from "react";

export default function useModals() {
  const { open, close } = useContext(ModlasDispatchContext);

  const openModal = <P extends {}>(Component: ComponentType<P>, props: P) => {
    open(Component, props);
  };

  const closeModal = <P extends {}>(Component: ComponentType<P>) => {
    close(Component);
  };

  return {
    openModal,
    closeModal,
  };
}
