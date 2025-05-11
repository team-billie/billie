import { create } from "zustand";
import { AddAccountResponseDto } from "@/types/pays/response";

const test = {
    id: 2,
    accountNo: "9999647556029016",
    bankCode: "999",
    accountType: "BILI_PAY",
    alias: "빌리페이",
    isPrimary: false,
    balance: 0,
    registeredAt: "2025-05-09T12:00:09.567865"
}

const test2 = {
    id: 2,
    accountNo: "0234094711070771",
    bankCode: "023",
    accountType: "제일은행",
    alias: "제일은행 계좌",
    isPrimary: true,
    balance: 1000000,
    registeredAt: "2025-05-09T12:00:09.567865"
}

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

const useUserStore = create<UserStore>((set) => ({
    username: "",   
    // username:"", 
    userKey: "",
    userId: null,    
    // userKey:"",
    billyAccount: test,
    mainAccount: test2,
    addedAccounts: [],
    setUserKey: (userKey: string) => set({ userKey }),
    setUserId: (userId: number) => set({ userId }),
    setBillyAccount: (billyAccount: AddAccountResponseDto) => set({ billyAccount }),
    setMainAccount: (mainAccount: AddAccountResponseDto) => set({ mainAccount }),
    setAddedAccounts: (addedAccounts: AddAccountResponseDto[]) => set({ addedAccounts }),

    reset: () => set({
        username: "",
        userKey: "",
        userId: null,
        billyAccount: null,
        mainAccount: null,
    })
}));

export default useUserStore;    

