type CreateFinUserResponseDto = {
    userId: string;
    userName: string;
    institutionCode: string;
    userKey: string;
    created: string;
    modified: string;
}

type GetFinUserResponseDto = {
    userId: string;
    userName: string;
    institutionCode: string;
    userKey: string;
    created: string;
    modified: string;
}

type CreateFinAccountResponseDto = {
    REC: {
        bankCode: string;
        accountNo: string;
        currency: {
            currency: string;
            currencyName: string;
        }
    }
}
type AddAccountResponseDto = {
    id: number;
    accountNo: string;
    bankCode: string;
    accountType: string;
    alias: string;
    isPrimary: boolean;
    balance: number;
    registeredAt: string;
}

type GetPaymentDataResponseDto = {
    ownerNickname: string;
    rentalFee: number;
    deposit: number;
    accountNo: string;
    bankCode: string;
}

type VerifyAccountResponseDto = {
    accountNo: string;
    bankCode: string;
    nickname: string;
}

type BillyAccountHistory= {
    transactionUniqueNo: string;
    transactionDate: string;
    transactionTime: string;
    transactionType: string;
    transactionTypeName: string;
    transactionAccountNo: string;
    transactionBalance: string;
    transactionAfterBalance: string;
    transactionSummary: string;
    transactionMemo: string;
}

type GetPaymentHistoryResponseDto = {
    totalCount: string;
    list: BillyAccountHistory[];
}

export type { 
    AddAccountResponseDto, 
    CreateFinUserResponseDto, 
    CreateFinAccountResponseDto,
    GetFinUserResponseDto,
    GetPaymentDataResponseDto,
    VerifyAccountResponseDto,
    GetPaymentHistoryResponseDto,
    BillyAccountHistory
};
