import LoginModal from "components/Auth/LoginModal";
import { ModalDispatchContext } from "context/ModalsProvider";
import { ComponentType, useContext } from "react";

export default function useToast() {
  const { open, close } = useContext(ModalDispatchContext);

  const openToast = (type: string, title: string, message: string) => {};

  const closeToast = () => {};

  return {
    openToast,
    closeToast,
  };
}
