import { create } from "zustand";

interface TestUserState {
  userId: number | null;
  setUserId: (id: number) => void;
  logout: () => void;
}

export const useTestUserStore = create<TestUserState>((set) => ({
  userId: null,
  setUserId: (id: number) => set({ userId: id }),
  logout: () => set({ userId: null }),
}));
