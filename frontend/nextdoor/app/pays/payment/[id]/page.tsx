"use client";

import Button from "@/components/pays/common/Button";
import Header from "@/components/pays/common/Header";
import Loading from "@/components/pays/common/Loading";
import AutoRechargeModal from "@/components/pays/modals/AutoRechargeModal";
import { TransferAccountRequest } from "@/lib/api/pays";
import useUserStore from "@/lib/store/useUserStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const router = useRouter();

    // 빌리 잔액 : zustand
    const { billyAccount, userKey } = useUserStore();
    const balance = billyAccount?.balance ?? 0;  

    // 이체할 금액, 사람, 계좌 : api 호출
    const amount = 30000;
    const receiverName = "단추";
    const receiverAccount = "0234094711070771";

    const [isChargeNeeded, setIsChargeNeeded] = useState(false);
    
    
    const sendBtnHandler = (isAfterRecharge: boolean = false) => {
        if (!isAfterRecharge && isChargeNeeded) { 
            console.log("충전 필요");
            setIsModalOpen(true); 
            return;
        }
            
        TransferAccountRequest({
            userKey: userKey,
            depositAccountNo: receiverAccount,
            transactionBalance: amount,
            withdrawalAccountNo: billyAccount?.accountNo ?? "",
            depositTransactionSummary: "빌리페이 입금",
            withdrawalTransactionSummary: "빌리페이 출금",
        }).then((res) => {
            console.log(res);
            alert("결제 완료");
            router.push("/profile");
        });
    }
        
    const [chargeNeeded, setChargeNeeded] = useState(0);
    useEffect(() => {
        const chargeAmount = amount - balance;
        setChargeNeeded(chargeAmount);

        if (chargeAmount > 0) {
            setIsChargeNeeded(true);
        }

    },[isChargeNeeded])
    
    return (
    <div className="relative flex flex-col min-h-[100dvh]">
        {isLoading 
        ?<Loading txt="결제가" isSuccess={isSuccess} headerTxt="빌리페이 송금"/>
        :<><Header txt="빌리페이 송금" />
        <div className="flex-1 flex flex-col items-center p-6">
            <div className="w-full flex-1 flex flex-col items-center gap-3 pt-44">
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 rounded-full bg-gray500"></div>
                    <div className="text-gray900 text-lg"><span className="font-semibold">{receiverName}</span>님에게</div>
                </div>
                <div className="text-gray900 text-4xl font-semibold">{amount}원</div>
                <div className="flex items-center gap-1 text-gray600 mb-60">
                    <span>빌리페이 잔액 {balance} 원</span>
                </div>
            </div>

            <Button txt="보내기" state={true} onClick={() => sendBtnHandler()}/>
        </div>
        </>
        }
        
        {isModalOpen && 
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60">
                <AutoRechargeModal setIsModalOpen={setIsModalOpen} sendBtnHandler={sendBtnHandler} needCharge={chargeNeeded}/>
            </div>
        }
    </div>
  );
  }