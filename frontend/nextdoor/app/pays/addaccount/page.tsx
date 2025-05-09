"use client";

//계좌 등록하기 페이지
import EnterAccount from "@/components/pays/common/EnterAccount";
import Header from "@/components/pays/common/Header";
import { useState } from "react";
import { BankDto } from "@/lib/utils/getBankInfo";
import { FormProvider, useForm } from "react-hook-form";

type FormValues = {
    accountNo: string;
}

export default function AddAccountPage() {
    const [selectedBank, setSelectedBank] = useState<BankDto | null>(null);

    const addAccountForm = useForm<FormValues>({
        defaultValues: {
            accountNo: "",
        },
    });

    const onSubmit = (data: FormValues) => {
        console.log(data);
    }

    return (
        <div className="relative flex flex-col h-[100dvh]">
            <Header txt="계좌 등록" />
            <FormProvider {...addAccountForm}>
                <div className="flex-1 overflow-y-auto flex flex-col gap-3 p-4">
                    <EnterAccount btnTxt="계좌 등록하기" selectedBank={selectedBank} setSelectedBank={setSelectedBank} onClick={addAccountForm.handleSubmit(onSubmit)} />
                    <div className="mt-4 text-sm text-gray700 text-center">계좌 등록이 처음이신가요?</div>
                </div>
            </FormProvider>
        </div>
    )
}