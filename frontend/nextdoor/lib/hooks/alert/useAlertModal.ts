// hooks/useAlertModal.ts
import { AlertModalContext } from "@/lib/providers/AlertModalProvider";
import { useContext } from "react";

export default function useAlertModal() {
  const context = useContext(AlertModalContext);
  if (!context) {
    throw new Error("useAlertModal must be used within an AlertModalProvider");
  }
  return context;
}
