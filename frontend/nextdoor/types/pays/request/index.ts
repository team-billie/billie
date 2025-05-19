//사용자 계정 생성
type CreateFinUserRequestDto = {
  userId: string;
  ssafyApiEmail: string;
};

//사용자 계정 조회
type GetFinUserRequestDto = {
  apiKey: string;
  userId: string;
};

//계좌 생성
type CreateFinAccountRequestDto = {
  userKey: string;
  accountTypeUniqueNo: string;
};

//계좌 목록 조회
type GetAccountListRequestDto = {
  userKey: string;
};

//계좌 정보 확인
type VerifyAccountRequestDto = {
  bankCode: string;
  accountNo: string;
};

//계좌 등록
type AddAccountRequestDto = {
  userKey: string;
  accountNo: string;
  bankCode: string;
  alias: string;
};

//등록된 계좌 목록 조회
type GetAddedListRequestDto = {
  userKey: string;
};

// 계좌 이체
type TransferAccountRequestDto = {
  userKey: string;
  depositAccountNo: string;
  transactionBalance: number;
  withdrawalAccountNo: string;
  depositTransactionSummary: string;
  withdrawalTransactionSummary: string;
};

//물품 결제
type PayItemRequestDto = {
  userKey: string;
  depositAccountNo: string;
  transactionBalance: number;
  withdrawalAccountNo: string;
  depositTransactionSummary: string;
  withdrawalTransactionSummary: string;
  rentalId: number;
};

//보증금 보관
type HoldDepositRequestDto = {
  userKey: string;
  rentalId: number;
  accountNo: string;
  amount: number;
};

//보증금 반환
type ReturnDepositRequestDto = {
  userKey: string;
  accountNo: string;
  deductedAmount: number;
  renterId: number;
  rentalId: number;
};

//Owner 계좌 선택
type SelectOwnerAccountRequestDto = {
  accountNo: string;
  bankCode: string;
  finalAmount: number;
};

// 결제 내역 조회
type GetPaymentHistoryRequestDto = {
  userKey: string;
  accountNo: string;
  startDate: string;
  endDate: string;
  transactionType: string;
  orderByType: string;
}

export type { CreateFinUserRequestDto, 
    CreateFinAccountRequestDto, 
    GetAccountListRequestDto,   
    AddAccountRequestDto, 
    GetAddedListRequestDto, 
    TransferAccountRequestDto, 
    HoldDepositRequestDto, 
    ReturnDepositRequestDto,
    VerifyAccountRequestDto,
    GetFinUserRequestDto,
    SelectOwnerAccountRequestDto,
    PayItemRequestDto,
    GetPaymentHistoryRequestDto, 
}; 
