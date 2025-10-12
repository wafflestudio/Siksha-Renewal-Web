"use client";

import { createContext, useState, useCallback, ReactNode } from "react";
import Toast from "components/general/Toast";

type ToastVariant = "default" | "speech-bubble";
type AnimationType = "slide" | "fade";

interface ToastOptions {
  duration?: number;
  delay?: number;
  animationDuration?: number;
  variant?: ToastVariant;
  animationType?: AnimationType;
}

interface ToastItem {
  id: number;
  message: string;
  duration: number;
  delay: number;
  animationDuration: number;
  variant: ToastVariant;
  animationType: AnimationType;
}

interface ToastContextValue {
  showToast: (message: string, options?: ToastOptions) => void;
}

export const ToastContext = createContext<ToastContextValue>({
  showToast: () => {},
});

interface ToastProviderProps {
  children: ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, options?: ToastOptions) => {
    const id = Date.now();
    const toastItem: ToastItem = {
      id,
      message,
      duration: options?.duration ?? 3000,
      delay: options?.delay ?? 0,
      animationDuration: options?.animationDuration ?? 300,
      variant: options?.variant ?? "default",
      animationType: options?.animationType ?? "slide",
    };
    setToasts((prev) => [...prev, toastItem]);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          duration={toast.duration}
          delay={toast.delay}
          animationDuration={toast.animationDuration}
          variant={toast.variant}
          animationType={toast.animationType}
          onDismiss={() => dismissToast(toast.id)}
        />
      ))}
    </ToastContext.Provider>
  );
}
