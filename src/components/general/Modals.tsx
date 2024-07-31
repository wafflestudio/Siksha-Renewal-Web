import { ModalsStateContext } from "context/ModalsProvider";
import useModals from "hooks/UseModals";
import { useContext } from "react";

export default function Modals() {
  const openedModals = useContext(ModalsStateContext);
  const { closeModal } = useModals();

  return (
    <>
      {openedModals.map((modal, i) => {
        const { Component, props } = modal;

        const { onClose, onSubmit, ...rest } = props;

        const handleClose = (...closeArgs: any[]) => {
          if (typeof onClose === "function") {
            onClose(...closeArgs);
          }
          closeModal(Component);
        };

        const handleSubmit = async (...submitArgs: any[]) => {
          if (typeof onSubmit === "function") {
            await onSubmit(...submitArgs);
          }
          // handleClose의 parameter들을 어떻게 전달해줄지 고민입니다.
          handleClose();
        };

        return (
          i === openedModals.length - 1 && (
            <Component key={i} {...rest} onClose={handleClose} onSubmit={handleSubmit} />
          )
        );
      })}
    </>
  );
}
