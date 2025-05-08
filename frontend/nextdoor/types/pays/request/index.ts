//사용자 계정 생성
type CreateFinUserRequestDto = {
    userId: string;
}

//계좌 생성
type CreateFinAccountRequestDto = {
    userKey: string;
    accountTypeUniqueNo: string;
}

//계좌 목록 조회
type GetAccountListRequestDto = {
    userKey: string;
}

//계좌 등록
type AddAccountRequestDto = {
    accountNo: string;
}

//등록된 계좌 목록 조회
type GetAddedListRequestDto = {
    //미정
}

// 계좌 입금
type DepositAccountRequestDto = {
    userKey: string;
    accountNo: string;
    transactionBalance: number;
    transactionSummary: string;
}

// 계좌 출금
type WithdrawAccountRequestDto = {
    userKey: string;
    accountNo: string;
    transactionBalance: number;
    transactionSummary: string;
}

// 계좌 이체
type TransferAccountRequestDto = {
    userKey: string;
    depositAccountNo: string;
    transactionBalance: number;
    withdrawalAccountNo: string;
    depositTransactionSummary: string;
    withdrawalTransactionSummary: string;
}   

//보증금 출금
type WithdrawDepositRequestDto = {
    userKey: string;
    rentalId: number;
    accountNo: string;
    amount: number;
}

//보증금 반환
type ReturnDepositRequestDto = {
    userKey: string;
    depositId: number;
}

export type { CreateFinUserRequestDto, 
    CreateFinAccountRequestDto, 
    GetAccountListRequestDto,   
    AddAccountRequestDto, 
    GetAddedListRequestDto, 
    DepositAccountRequestDto, 
    WithdrawAccountRequestDto, 
    TransferAccountRequestDto, 
    WithdrawDepositRequestDto, 
    ReturnDepositRequestDto  }; 
