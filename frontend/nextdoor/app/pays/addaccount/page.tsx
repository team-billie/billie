"use client";

//계좌 등록하기 페이지
import EnterAccount from "@/components/pays/common/EnterAccount";
import Header from "@/components/pays/common/Header";
import { useState } from "react";
import { BankDto } from "@/lib/utils/getBankInfo";
import { FormProvider, useForm } from "react-hook-form";
import Link from "next/link";
import useUserStore from "@/lib/store/useUserStore";
import { AddAccountRequest } from "@/lib/api/pays";
import { useRouter } from "next/navigation";
import { CheckAccountRequestDto } from "@/types/pays/request";

type FormValues = {
    accountNo: string;
    bankCode: string;
    userKey: string;
    alias: string;
}   

export default function AddAccountPage() {
    const { userKey } = useUserStore();
    const router = useRouter();

    const addAccountForm = useForm<FormValues>({
        defaultValues: {
            accountNo: "",
            bankCode: "",
            userKey: userKey,
            alias: "앱 계좌 등록",
        },
    });
    
    const handleAccountSelected = (selectedAccount: CheckAccountRequestDto) => {
        addAccountForm.setValue("bankCode", selectedAccount.bankCode);
        addAccountForm.setValue("accountNo", selectedAccount.accountNo);

        AddAccountRequest(addAccountForm.getValues()).then((res) => {
            alert("계좌 등록이 완료되었습니다.");
            router.push("/profile");    
        });
        console.log(addAccountForm.getValues());
    }

    return (
        <div className="relative flex flex-col h-[100dvh]">
            <Header txt="계좌 등록" />
            <FormProvider {...addAccountForm}>
                <div className="flex-1 overflow-y-auto flex flex-col gap-3 p-4">
                    <EnterAccount btnTxt="계좌 등록하기" handleAccountSelected={handleAccountSelected} />
                    <Link href="/pays/makeaccount" className="mt-4 text-sm text-gray700 text-center">계좌 등록이 처음이신가요?</Link>
                </div>
            </FormProvider>
        </div>
    )
}