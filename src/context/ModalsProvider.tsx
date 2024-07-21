import { createContext, ReactNode, useMemo, useState } from "react";
import { ComponentType } from "react";

interface Modal<P> {
  Component: ComponentType<P>;
  props: P;
}

interface ModalsDispatchContextProps {
  open: <P extends {}>(Component: ComponentType<P>, props: P) => void;
  close: <P extends {}>(Component: ComponentType<P>) => void;
}

interface ModalProviderProps {
  children: ReactNode;
}

export const ModlasDispatchContext = createContext<ModalsDispatchContextProps>({
  open: () => {},
  close: () => {},
});

export const ModalsStateContext = createContext<Modal<any>[]>([]);

export const ModalsProvider = ({ children }: ModalProviderProps) => {
  const [openedModals, setOpenedModals] = useState<Modal<any>[]>([]);

  const open = <P extends {}>(Component: ComponentType<P>, props: P) => {
    setOpenedModals((modals) => [...modals, { Component, props }]);
  };
  const close = <P extends {}>(Component: ComponentType<P>) => {
    setOpenedModals((modals) => modals.filter((modal) => modal.Component !== Component));
  };

  const dispatch = useMemo(() => ({ open, close }), []);

  return (
    <ModalsStateContext.Provider value={openedModals}>
      <ModlasDispatchContext.Provider value={dispatch}>{children}</ModlasDispatchContext.Provider>
    </ModalsStateContext.Provider>
  );
};
