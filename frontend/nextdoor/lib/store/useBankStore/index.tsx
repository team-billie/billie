// 현재 충전, 등록, 송금하려는 계좌를 관리하는 store

import { create } from "zustand";

export type TargetBankDto = {
    bankUserName: string;
    bankCode: string;
    bankName: string;
    bankAccountNo: string;
    bankImage: string;
}

interface BankStore {
    targetBank: TargetBankDto | null;
    setTargetBank: (bank: TargetBankDto) => void;
}

export const useBankStore = create<BankStore>((set) => ({
    targetBank: null,
    setTargetBank: (bank: TargetBankDto) => set({ targetBank: bank }),
}));


