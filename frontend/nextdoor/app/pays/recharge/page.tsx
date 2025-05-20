"use client";

//충전하기 페이지
import Button from "@/components/pays/common/Button";
import Header from "@/components/pays/common/Header";
import { AmountInput } from "@/components/pays/common/Input";
import MyAccountListModal from "@/components/pays/modals/MyAccountListModal";
import useUserStore from "@/lib/store/useUserStore";
import { TransferAccountRequestDto } from "@/types/pays/request/index";
import { AddAccountResponseDto } from "@/types/pays/response";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { getBankInfo } from "@/lib/utils/getBankInfo";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useRouter } from "next/navigation";
import { TransferAccountRequest } from "@/lib/api/pays";
import { useAlertStore } from "@/lib/store/useAlertStore";
import { formatNumberWithCommas } from "@/lib/utils/money";
import Loading from "@/components/pays/common/Loading";

type FormValues = TransferAccountRequestDto;

export default function RechargePage() {
    const [isAccountListModalOpen, setIsAccountListModalOpen] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState<AddAccountResponseDto | null>(null);
    const { mainAccount, billyAccount, userKey } = useUserStore();
    const router = useRouter();
    const rechargeAccount = selectedAccount ?? mainAccount;
    const { showAlert } = useAlertStore();

    const [status, setStatus] = useState<'loading' | 'success' | 'error' | null>(null);

    const rechargeForm = useForm<FormValues>({
        defaultValues: {
            userKey: userKey,
            depositAccountNo: billyAccount?.accountNo ?? "",
            // transactionBalance: 0,
            depositTransactionSummary: "빌리계좌 충전",
            withdrawalTransactionSummary: "빌리계좌 충전",
        },
    });

    const onSubmit = (data: FormValues) => {
        const transactionBalance = rechargeForm.getValues("transactionBalance");
        if (!data.transactionBalance || data.transactionBalance === 0) {
            showAlert("송금 금액을 입력해주세요.", "error");
            return;
        }
        //0500같이 0으로 숫자가 시작할 경우 return 하고 값 리셋
        if (data.transactionBalance.toString().startsWith("0")) {
            rechargeForm.setValue("transactionBalance", 0);
            showAlert("올바른 금액을 입력해주세요.", "error");
            return;
        }

        const rawValue = String(data.transactionBalance).replace(/,/g, '');
        const balance = Number(rawValue);
        //1000원 단위로 송금하도록 return 가장 근접한 천 단위로 바꿔주고
        if (balance % 1000 !== 0) {
            data.transactionBalance = Math.round(balance / 1000) * 1000;
            rechargeForm.setValue("transactionBalance", data.transactionBalance);
            showAlert("1000원 단위로 송금해주세요.", "error");
            return;
        }


        rechargeForm.setValue("withdrawalAccountNo", rechargeAccount?.accountNo ?? "");
        setStatus('loading');
        TransferAccountRequest(rechargeForm.getValues())
            .then((res) => {
                setTimeout(() => {
                    setStatus('success');
                    showAlert("빌리페이 충전 완료", "success");
                }, 1500);
            })
            .catch((err) => {
                setTimeout(() => {
                    setStatus('error');
                    if (err.code === "A1014") {
                        showAlert("계좌 잔액 부족으로 충전 불가", "error");
                    } else {
                        showAlert("빌리페이 충전 실패", "error");
                    }
                }, 1500);
            });
    }

    const handleAmountChange = (amount: number) => {
        const currentBalance = rechargeForm.getValues("transactionBalance") ?? 0;
        rechargeForm.setValue("transactionBalance", Number(currentBalance) + amount);
    }

    const watchedAmount = useWatch({
        control: rechargeForm.control,
        name: "transactionBalance",
    });

    useEffect(() => {
        //최대 200만원 송금 가능
        if (watchedAmount > 2000000) {
            showAlert("최대 200만원 송금 가능합니다.", "error");
            rechargeForm.setValue("transactionBalance", 2000000);
        }
    }, [watchedAmount]);

    return (
        <div className="relative flex flex-col min-h-[100dvh]">
            {status
                ? <Loading type="recharge" status={status} headerTxt="충전" />
                : <>
                    <Header txt="충전" />
                    <FormProvider {...rechargeForm}>
                        <div className="flex-1 flex flex-col items-center">
                    <div className="flex flex-col items-center mb-10 mt-20 text-gray600">
                        <div className="flex gap-2 items-center justify-center" onClick={() => setIsAccountListModalOpen(true)}>
                            <img
                                src={getBankInfo(rechargeAccount?.bankCode ?? "000")?.image}
                                alt={getBankInfo(rechargeAccount?.bankCode ?? "000")?.bankName}
                                className="w-7 h-7 rounded-full"
                            />
                            <div className="text-gray900 font-semibold">내 <span>{getBankInfo(rechargeAccount?.bankCode ?? "000")?.bankName}</span> 계좌에서</div>
                            <ChevronDown className="w-4 h-full" />
                        </div>
                        <div className="text-sm">{rechargeAccount?.accountNo}</div>
                    </div>

                    <div className="flex flex-col items-center">
                        <AmountInput placeholderTxt="얼마를 충전할까요?" />
                        <div className="text-xs text-gray600">빌리페이 잔액 <span>{formatNumberWithCommas(billyAccount?.balance ?? 0)}원</span></div>
                    </div>

                    <div className="flex text-gray900 text-sm mt-5 py-5 gap-3">
                        <div onClick={() => handleAmountChange(10000)} className="border border-gray300 px-3 py-1 rounded-2xl" >+1만원</div>
                        <div onClick={() => handleAmountChange(50000)} className="border border-gray300 px-3 py-1 rounded-2xl" >+5만원</div>
                        <div onClick={() => handleAmountChange(100000)} className="border border-gray300 px-3 py-1 rounded-2xl" >+10만원</div>
                    </div>

                    <div className="p-4 w-full flex-1 flex items-end">
                        <Button onClick={rechargeForm.handleSubmit(onSubmit)} txt="충전하기" state={true} />
                    </div>
                </div>
            </FormProvider>
            {isAccountListModalOpen &&
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60">
                    <MyAccountListModal setIsModalOpen={setIsAccountListModalOpen} setSelectedAccount={setSelectedAccount} />
                </div>
            }
            </>
            }
        </div>
    );
}