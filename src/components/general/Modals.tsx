import { ModalsStateContext } from "context/ModalsProvider";
import useModals from "hooks/UseModals";
import { useContext } from "react";

export default function Modals() {
  const openedModals = useContext(ModalsStateContext);
  const { closeModal } = useModals();

  return openedModals.map((modal, i) => {
    const { Component, props } = modal;

    const { onClose, onSubmit, ...rest } = props;

    const handleClose = () => {
      onClose();
      closeModal(Component);
    };

    const handleSubmit = async () => {
      if (typeof onSubmit === "function") {
        await onSubmit();
      }
      handleClose();
    };

    return (
      i === openedModals.length - 1 && (
        <Component key={i} {...rest} onClose={handleClose} onSubmit={handleSubmit} />
      )
    );
  });
}
