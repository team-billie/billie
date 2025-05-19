import { create } from "zustand";

type AlertState = {
  type: "success" | "error";
  message: string;
  isOpen: boolean;
  isExiting: boolean;
  showAlert: (msg: string, type: "success" | "error") => void;
};

export const useAlertStore = create<AlertState>((set) => ({
  message: "",
  type: "success",
  isOpen: false,
  isExiting: false,
  showAlert: (msg: string, type: "success" | "error") => {
    set((state) => {
      if (state.isOpen) return state; 
      return {
        ...state,
        message: msg,
        type: type,
        isOpen: true,
      };
    });

    // 비동기 타이머로 알림 닫기 처리
    setTimeout(() => {
      set({ isExiting: true });

      setTimeout(() => {
        set({
          isOpen: false,
          isExiting: false,
          type: type,
          message: "",
        });
      }, 500); // exit 애니메이션 시간
    }, 2000); // 표시 시간
  },
}));
