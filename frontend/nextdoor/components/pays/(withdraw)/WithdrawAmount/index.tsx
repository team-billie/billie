"use client";

//송금하기 컴포넌트
import { ChevronDown } from "lucide-react"
import Button from "@/components/pays/common/Button";
import { AmountInput } from "@/components/pays/common/Input";
import { FormProvider, useForm } from "react-hook-form";
import { useBankStore } from "@/lib/store/useBankStore";
import { TransferAccountRequestDto } from "@/types/pays/request/index";
type FormValues = TransferAccountRequestDto;

export default function WithdrawAmount() {
    const { targetBank } = useBankStore();

    const withdrawForm = useForm<FormValues>({
        defaultValues: {
            userKey: "",
            depositAccountNo: targetBank?.bankAccountNo,
            // transactionBalance: 0,
            withdrawalAccountNo: "",
            depositTransactionSummary: "",
            withdrawalTransactionSummary: "",
        },
    });
    
    const onSubmit = (data: FormValues) => {
        console.log(data);
        // console.log(targetBank);
    }

    return (
    <FormProvider {...withdrawForm}>
        <div className="flex-1 flex flex-col items-center">
            <div className="flex flex-col items-center mb-10 mt-20 text-gray600 gap-2">
                <div className="text-gray900 text-lg font-semibold">{targetBank?.bankUserName}님에게</div>
                <div className="flex gap-2 items-center justify-center">
                    <img
                        src={targetBank?.bankImage}
                        alt={targetBank?.bankName}
                        className="w-7 h-7 rounded-full border border-gray500"
                    />
                    <div className="text-gray700 font-semibold"><span>{targetBank?.bankName}</span> {targetBank?.bankAccountNo}</div>
                </div>
            </div>
            
            <div className="flex flex-col items-center">
                <AmountInput placeholderTxt="얼마를 송금할까요?"/>
                <div className="text-xs text-gray600">빌리페이 잔액 <span>0</span>원</div>
            </div>

            <div className="flex text-gray900 text-sm mt-5 py-5 gap-3">
                <div className="border border-gray300 px-3 py-1 rounded-2xl" >+1만원</div>
                <div className="border border-gray300 px-3 py-1 rounded-2xl" >+5만원</div>
                <div className="border border-gray300 px-3 py-1 rounded-2xl" >+10만원</div>
            </div>

            <div className="p-4 w-full flex-1 flex items-end">
                <Button onClick={withdrawForm.handleSubmit(onSubmit)} txt="송금하기" state={true}/>
            </div>
        </div>
    </FormProvider>
    );
}