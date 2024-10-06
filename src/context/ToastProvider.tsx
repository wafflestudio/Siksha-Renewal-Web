import { createContext, ReactNode, useMemo, useState } from "react";

/*
1. 모달처럼 여러개를 띄울 수 있다고 가정
2. message가 primary key가 된다고 가정
*/
interface Toast {
  type: string;
  title: string;
  message: string;
  icon?: string;
}

interface ToastDispatchContextProps {
  open: (toast: Toast) => void;
  close: () => void;
}

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastDispatchContext = createContext<ToastDispatchContextProps>({
  open: () => {},
  close: () => {},
});

export const ToastStateContext = createContext<Toast | null>(null);

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [openedToast, setOpenedToast] = useState<Toast | null>(null);

  const open = (newToast: Toast) => {
    console.log("newToast", newToast);
    setOpenedToast(newToast);
  };

  const close = () => {
    setOpenedToast(null);
  };

  const dispatch = useMemo(() => ({ open, close }), []);

  return (
    <ToastStateContext.Provider value={openedToast}>
      <ToastDispatchContext.Provider value={dispatch}>{children}</ToastDispatchContext.Provider>
    </ToastStateContext.Provider>
  );
};
