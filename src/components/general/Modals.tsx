import { ModalsStateContext } from "context/ModalsProvider";
import useModals from "hooks/UseModals";
import { useContext, useEffect } from "react";

export default function Modals() {
  const openedModals = useContext(ModalsStateContext);
  const { closeModal } = useModals();

  const currentPath = typeof window !== "undefined" ? window.location.href : null;

  // 주소 변경(주로 뒤로가기) 시 closeModal
  useEffect(() => {
    if (openedModals.length >= 1) {
      const { Component } = openedModals[openedModals.length - 1];
      closeModal(Component);
    }
  }, [currentPath]);

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
