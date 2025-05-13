import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AddAccountResponseDto } from "@/types/pays/response";

const test = {
  id: 2,
  accountNo: "9999647556029016",
  bankCode: "999",
  accountType: "BILI_PAY",
  alias: "빌리페이",
  isPrimary: false,
  balance: 0,
  registeredAt: "2025-05-09T12:00:09.567865",
};

const test2 = {
  id: 2,
  accountNo: "0234094711070771",
  bankCode: "023",
  accountType: "제일은행",
  alias: "제일은행 계좌",
  isPrimary: true,
  balance: 1000000,
  registeredAt: "2025-05-09T12:00:09.567865",
};

interface UserStore {
  username: string;
  userId: number | null;
  userKey: string;
  profileImage: string;
  setUserKey: (userKey: string) => void;
  setUserId: (userId: number) => void;
  setUser: (id: number, name: string, profileImage: string) => void; // 통합 함수 추가
  setProfileImage: (profileImage: string) => void; // 아바타 설정 함수 추가
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
      profileImage: "/images/profileimg.png", // 기본 아바타 URL
      billyAccount: test,
      mainAccount: test2,
      addedAccounts: [],
      setUserKey: (userKey: string) => set({ userKey }),
      setUserId: (userId: number) => set({ userId }),
      setUser: (id: number, name: string, profileImage: string) =>
        set({ userId: id, username: name, profileImage }), // 통합 함수 구현
      setProfileImage: (profileImage: string) => set({ profileImage }), // 아바타 설정 함수 구현
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
          profileImage: "/images/profileimg.png",
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
        profileImage: state.profileImage,
        billyAccount: state.billyAccount,
        mainAccount: state.mainAccount,
        addedAccounts: state.addedAccounts,
      }),
    }
  )
);

export default useUserStore;
