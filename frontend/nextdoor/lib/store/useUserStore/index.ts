import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AddAccountResponseDto } from "@/types/pays/response";
import { GetUserInfoResponse } from "@/types/auth/response";

interface UserStore {
  username: string | null;
  profileImageUrl: string | null;
  userId: number | null;
  userKey: string;
  address: string | null;
  email: string | null;
  birth: string | null;
  gender: string | null;

  setUserKey: (userKey: string) => void;
  setUserId: (userId: number) => void;
  setUser: (user: GetUserInfoResponse) => void;
  
  billyAccount: AddAccountResponseDto | null;
  mainAccount: AddAccountResponseDto | null;
  addedAccounts: AddAccountResponseDto[];
  setBillyAccount: (billyAccount: AddAccountResponseDto) => void;
  setMainAccount: (mainAccount: AddAccountResponseDto) => void;
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
      address: null,
      email: "",
      birth: "",
      gender: "",
      profileImageUrl: "",

      setUser: (user: GetUserInfoResponse) => set({
        username: user.nickname,
        profileImageUrl: user.profileImageUrl,
        userId: user.id,
        address: user.address,
        email: user.email,
        birth: user.birth,
        gender: user.gender,
      }),
      
      setUserId: (userId: number) => set({ userId }),
      setUserKey: (userKey: string) => set({ userKey }),
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
          address: null,
          email: "",
          birth: "",
          gender: "",
          profileImageUrl: "",
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
        address: state.address,
        email: state.email,
        birth: state.birth,
        gender: state.gender,
        profileImageUrl: state.profileImageUrl,
      }),
    }
  )
);

export default useUserStore;  
