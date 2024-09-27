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
  close: (content: string) => void;
}

interface ToastProviderProps {
  children: ReactNode;
}

export const ModalDispatchContext = createContext<ToastDispatchContextProps>({
  open: () => {},
  close: () => {},
});

export const ModalsStateContext = createContext<Toast[]>([]);

export const ModalsProvider = ({ children }: ToastProviderProps) => {
  const [openedToast, setOpenedToast] = useState<Toast[]>([]);

  const open = (newToast: Toast) => {
    setOpenedToast(() => [...openedToast, newToast]);
  };
  const close = (content: string) => {
    setOpenedToast(() => openedToast.filter((toast) => toast.message !== content));
  };

  const dispatch = useMemo(() => ({ open, close }), []);

  return (
    <ModalsStateContext.Provider value={openedToast}>
      <ModalDispatchContext.Provider value={dispatch}>{children}</ModalDispatchContext.Provider>
    </ModalsStateContext.Provider>
  );
};
