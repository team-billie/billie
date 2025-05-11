import { create } from "zustand";

// 계좌 정보 타입
export type BankAccountDto = {
  bankUserName: string;    // 예금주 이름
  bankCode: string;        // 은행 코드 (예: 004)
  bankName: string;        // 은행 이름 (예: 국민은행)
  bankAccountNo: string;   // 계좌번호
  bankImage: string;       // 은행 로고 이미지 URL
};

const initialBankAccount: BankAccountDto = {
  bankUserName: "내 계좌",
  bankCode: "090",
  bankName: "카카오뱅크",
  bankAccountNo: "3333139177983",
  bankImage: "/images/bank/kakao.png",
};

// Zustand 스토어 인터페이스
interface BankStore {
  senderBank: BankAccountDto | null;       // 출금 계좌
  receiverBank: BankAccountDto | null;    // 입금 계좌
  setSenderBank: (bank: BankAccountDto) => void;
  setReceiverBank: (bank: BankAccountDto) => void;
  resetBanks: () => void;                  // 초기화
}

// Zustand 스토어 생성
export const useBankStore = create<BankStore>((set) => ({
  senderBank: initialBankAccount,
  receiverBank: null,
  setSenderBank: (bank) => set({ senderBank: bank }),
  setReceiverBank: (bank) => set({ receiverBank: bank }),
  resetBanks: () => set({ senderBank: initialBankAccount, receiverBank: null }),
}));
