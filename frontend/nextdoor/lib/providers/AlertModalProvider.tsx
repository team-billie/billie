// providers/AlertModalProvider.tsx
"use client";

import { createContext, useState, ReactNode } from "react";
import AlertModal from "@/components/common/AlertModal";

interface AlertState {
  title: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
  visible: boolean;
}

interface AlertModalContextType {
  showAlert: (
    title: string,
    message: string,
    type?: "success" | "error" | "warning" | "info"
  ) => void;
}

export const AlertModalContext = createContext<AlertModalContextType | null>(
  null
);

export const AlertModalProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<AlertState>({
    title: "",
    message: "",
    type: "info",
    visible: false,
  });

  const showAlert = (
    title: string,
    message: string,
    type: "success" | "error" | "warning" | "info" = "info"
  ) => {
    setAlert({ title, message, type, visible: true });
  };

  const handleClose = () => {
    setAlert((prev) => ({ ...prev, visible: false }));
  };

  return (
    <AlertModalContext.Provider value={{ showAlert }}>
      {children}
      {alert.visible && (
        <AlertModal
          title={alert.title}
          message={alert.message}
          type={alert.type}
          onClose={handleClose}
        />
      )}
    </AlertModalContext.Provider>
  );
};
