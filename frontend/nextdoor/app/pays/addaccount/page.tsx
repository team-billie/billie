"use client";

//계좌 등록하기 페이지
import EnterAccount from "@/components/pays/common/EnterAccount";
import Header from "@/components/pays/common/Header";
import { AddAccountRequest } from "@/lib/api/pays";
import useUserStore from "@/lib/store/useUserStore";
import { AddAccountRequestDto } from "@/types/pays/request";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { useAlertStore } from "@/lib/store/useAlertStore";


type FormValues = {
    accountNo: string;
    bankCode: string;
    userKey: string;
    alias: string;
}   

export default function AddAccountPage() {
    const { userKey } = useUserStore();
    const router = useRouter();
    const { showAlert } = useAlertStore();


    const addAccountForm = useForm<FormValues>({
        defaultValues: {
            accountNo: "",
            bankCode: "",
            userKey: userKey,
            alias: "앱 계좌 등록",
        },
    });
    
    const handleAccountSelected = (selectedAccount: AddAccountRequestDto) => {
        addAccountForm.setValue("bankCode", selectedAccount.bankCode);
        addAccountForm.setValue("accountNo", selectedAccount.accountNo);

        AddAccountRequest(addAccountForm.getValues())
            .then((res) => {
                router.push("/profile");    
                showAlert("계좌 등록이 완료되었습니다.", "success");
            })
            .catch((err) => {
                console.log(err);
                showAlert("계좌 등록에 실패했습니다.", "error");
            })
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