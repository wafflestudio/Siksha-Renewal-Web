import { ToastDispatchContext, ToastStateContext } from "providers/ToastProvider";
import { useContext } from "react";

export default function useToast() {
  const openedToast = useContext(ToastStateContext);
  const { open, close } = useContext(ToastDispatchContext);

  const openToast = (type: string, title: string, message: string) => {
    console.log("openToast", type, title, message);
    open({ type, title, message });
  };

  const closeToast = () => {
    close();
  };

  return {
    openToast,
    closeToast,
    openedToast,
  };
}
