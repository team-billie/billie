"use client";

//송금하기 컴포넌트
import { ChevronDown } from "lucide-react"
import Button from "@/components/pays/common/Button";
import { AmountInput } from "@/components/pays/common/Input";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { TransferAccountRequestDto } from "@/types/pays/request/index";
import useUserStore from "@/lib/store/useUserStore";
import { TransferAccountRequest } from "@/lib/api/pays";
import { useRouter } from "next/navigation";
import { VerifyAccountResponseDto } from "@/types/pays/response";
import { getBankInfo } from "@/lib/utils/getBankInfo";
import { useAlertStore } from "@/lib/store/useAlertStore";
import { useEffect } from "react";

type FormValues = TransferAccountRequestDto;

interface WithdrawAmountProps {
    verifiedAccount: VerifyAccountResponseDto | null;
}

export default function WithdrawAmount({ verifiedAccount }: WithdrawAmountProps) {
    const { userKey, billyAccount } = useUserStore();
    const router = useRouter();
    const { showAlert } = useAlertStore();
    const withdrawForm = useForm<FormValues>({
        defaultValues: {
            userKey: userKey,
            depositAccountNo: verifiedAccount?.accountNo ?? "",
            // transactionBalance: 0,
            withdrawalAccountNo: billyAccount?.accountNo,
            depositTransactionSummary: "빌리페이 출금",
            withdrawalTransactionSummary: "빌리페이 입금",
        },
    });


    const onSubmit = (data: FormValues) => {
        if (!data.transactionBalance || data.transactionBalance === 0) {
            showAlert("송금 금액을 입력해주세요.", "error");
            return;
        }
        //0500같이 0으로 숫자가 시작할 경우 return 하고 값 리셋
        if (data.transactionBalance.toString().startsWith("0")) {
            withdrawForm.setValue("transactionBalance", 0);
            showAlert("올바른 금액을 입력해주세요.", "error");
            return;
        }

        const rawValue = String(data.transactionBalance).replace(/,/g, '');
        const balance = Number(rawValue);
        //1000원 단위로 송금하도록 return 가장 근접한 천 단위로 바꿔주고
        if (balance % 1000 !== 0) {
            data.transactionBalance = Math.round(balance / 1000) * 1000;
            withdrawForm.setValue("transactionBalance", data.transactionBalance);
            showAlert("1000원 단위로 송금해주세요.", "error");
            return;
        }

        console.log(data);
        TransferAccountRequest(data).then((res) => {
            showAlert("빌리에서 계좌로 이체가 완료되었습니다.", "success");
            router.push("/profile");
        }).catch((err) => {
            showAlert("빌리에서 계좌로 이체에 실패했습니다.", "error");
        });
    }

    const handleAmountChange = (amount: number) => {
        const currentBalance = withdrawForm.getValues("transactionBalance") ?? 0;
        withdrawForm.setValue("transactionBalance", Number(currentBalance) + amount);
    }

    const watchedAmount = useWatch({
        control: withdrawForm.control,
        name: "transactionBalance",
    });

    useEffect(() => {
        if (watchedAmount > (billyAccount?.balance ?? 0)) {
            showAlert("잔액을 초과할 수 없습니다.", "error");
            withdrawForm.setValue("transactionBalance", billyAccount?.balance ?? 0);
        }

        //최대 200만원 송금 가능
        if (watchedAmount > 2000000) {
            showAlert("최대 200만원 송금 가능합니다.", "error");
            withdrawForm.setValue("transactionBalance", 2000000);
        }
    }, [watchedAmount]);

    return (
        <FormProvider {...withdrawForm}>
            <div className="flex-1 flex flex-col items-center">
                <div className="flex flex-col items-center mb-10 mt-20 text-gray600 gap-2">
                    <div className="text-gray900 text-lg font-semibold">{verifiedAccount?.nickname}에게</div>
                    <div className="flex gap-2 items-center justify-center">
                        <img
                            src={getBankInfo(verifiedAccount?.bankCode ?? "000")?.image}
                            alt={getBankInfo(verifiedAccount?.bankCode ?? "000")?.bankName}
                            className="w-7 h-7 rounded-full border border-gray500"
                        />
                        <div className="text-gray700 font-semibold"><span>{getBankInfo(verifiedAccount?.bankCode ?? "000")?.bankName}</span> {verifiedAccount?.accountNo}</div>
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <AmountInput placeholderTxt="얼마를 송금할까요?" />
                    <div className="text-xs text-gray600">빌리페이 잔액 <span>{billyAccount?.balance}</span>원</div>
                </div>

                <div className="flex text-gray900 text-sm mt-5 py-5 gap-3">
                    <div onClick={() => handleAmountChange(10000)} className="border border-gray300 px-3 py-1 rounded-2xl" >+1만원</div>
                    <div onClick={() => handleAmountChange(50000)} className="border border-gray300 px-3 py-1 rounded-2xl" >+5만원</div>
                    <div onClick={() => handleAmountChange(100000)} className="border border-gray300 px-3 py-1 rounded-2xl" >+10만원</div>
                </div>

                <div className="p-4 w-full flex-1 flex items-end">
                    <Button onClick={withdrawForm.handleSubmit(onSubmit)} txt="송금하기" state={true} />
                </div>
            </div>
        </FormProvider>
    );
}