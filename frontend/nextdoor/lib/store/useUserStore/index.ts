import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AddAccountResponseDto } from "@/types/pays/response";

interface UserStore {
  username: string;
  userId: number | null;
  userKey: string;
  setUserKey: (userKey: string) => void;
  setUserId: (userId: number) => void;
  billyAccount: AddAccountResponseDto | null;
  mainAccount: AddAccountResponseDto | null;
  setBillyAccount: (billyAccount: AddAccountResponseDto) => void;
  setMainAccount: (mainAccount: AddAccountResponseDto) => void;
  addedAccounts: AddAccountResponseDto[];
  setAddedAccounts: (addedAccounts: AddAccountResponseDto[]) => void;
  reset: () => void;
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      username: "",
      userKey: "",
      userId: null,
      billyAccount: null,
      mainAccount: null,
      addedAccounts: [],
      setUserKey: (userKey: string) => set({ userKey }),
      setUserId: (userId: number) => set({ userId }),
      setBillyAccount: (billyAccount: AddAccountResponseDto) =>
        set({ billyAccount }),
      setMainAccount: (mainAccount: AddAccountResponseDto) =>
        set({ mainAccount }),
      setAddedAccounts: (addedAccounts: AddAccountResponseDto[]) =>
        set({ addedAccounts }),
      reset: () =>
        set({
          username: "",
          userKey: "",
          userId: null,
          billyAccount: null,
          mainAccount: null,
          addedAccounts: [],
        }),
    }),
    {
      name: "user-store", // localStorage에 저장될 key
      partialize: (state) => ({
        username: state.username,
        userKey: state.userKey,
        userId: state.userId,
        billyAccount: state.billyAccount,
        mainAccount: state.mainAccount,
        addedAccounts: state.addedAccounts,
      }),
    }
  )
);

export default useUserStore;
