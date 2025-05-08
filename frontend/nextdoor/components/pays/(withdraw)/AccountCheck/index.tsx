"use client";

import AccountList from "@/components/pays/common/AccountList";
import EnterAccount from "@/components/pays/common/EnterAccount";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { BankDto } from "@/lib/utils/getBankInfo";
import { useBankStore } from "@/lib/store/useBankStore";

interface AccountCheckProps {
    setIsPossibleAccount: (isPossibleAccount: boolean) => void;
}

type FormValues = {
    accountNo: string;
};

export default function AccountCheck({setIsPossibleAccount}: AccountCheckProps) {
    const [selectedBank, setSelectedBank] = useState<BankDto | null>(null);
    const { setTargetBank, targetBank } = useBankStore();


    const onSubmit = (data: FormValues) => {
        // 계좌 정보 확인 코드 백엔드 구현후 작성예정

        if (selectedBank) {
            setTargetBank({
                bankUserName: "허준수",
                bankCode: selectedBank?.bankCode,
                bankName: selectedBank?.bankName,
                bankAccountNo: data.accountNo,
                bankImage: selectedBank?.image,
                });
                // 계좌 정보 저장 후 송금 페이지로 이동
            setIsPossibleAccount(true);
        }
    }

    const checkAccountForm = useForm<FormValues>({
        defaultValues: {
            accountNo: "",
        },
    });
     
    return (
        <FormProvider {...checkAccountForm}>
            <div className="flex-1 overflow-y-auto flex flex-col gap-3 p-4">
                <EnterAccount btnTxt="다음" selectedBank={selectedBank} setSelectedBank={setSelectedBank} onClick={checkAccountForm.handleSubmit(onSubmit)}/>
                <div className="text-lg font-bold">내 계좌</div>
                <div className="overflow-y-auto flex flex-col gap-3">
                    <AccountList/>
                </div>
            </div>
        </FormProvider>
    );
}
