"use client";

import { TransferAccountRequest } from "@/lib/api/pays";
import useUserStore from "@/lib/store/useUserStore";
import { getBankInfo } from "@/lib/utils/getBankInfo";
import { AddAccountResponseDto } from "@/types/pays/response";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../../common/Button";
import MyAccountListModal from "../MyAccountListModal";

interface AutoRechargeModalProps {
    setIsModalOpen: (isModalOpen: boolean) => void;
    needCharge: number;
    sendBtnHandler: (isAfterRecharge: boolean) => void;
}

export default function AutoRechargeModal({ setIsModalOpen, needCharge, sendBtnHandler}: AutoRechargeModalProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isAccountListModalOpen, setIsAccountListModalOpen] = useState(false);
    const { mainAccount, billyAccount, userKey } = useUserStore();
    const [selectedAccount, setSelectedAccount] = useState<AddAccountResponseDto | null>(null);
    const rechargeAccount = selectedAccount ?? mainAccount;

    useEffect(() => {
        setIsVisible(true);
    }, []);
    
    const submitBtnHandler = () => {
        setIsVisible(false);
        setTimeout(() => setIsModalOpen(false), 300);
        
        TransferAccountRequest({
            userKey: userKey,
            depositAccountNo: billyAccount?.accountNo ?? "",
            transactionBalance: needCharge,
            withdrawalAccountNo: rechargeAccount?.accountNo ?? "",
            depositTransactionSummary: "빌리페이 충전",
            withdrawalTransactionSummary: "빌리페이 충전",
        }).then((res) => {
            console.log("충전완료");
            sendBtnHandler(true);
        });
    }

    return (
        <>
        <div className={`absolute bottom-0 bg-white rounded-t-2xl w-full flex flex-col gap-2 border-t p-6 transform transition-transform duration-500 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
            <div className="text-blue400 text-2xl font-semibold mb-2">Billy Pay</div>
            <div className="flex justify-between items-center gap-2 text-lg font-semibold ">
                <div className="text-gray600">충전 계좌</div>
                <div className="flex items-center gap-2">
                    <button onClick={() => setIsAccountListModalOpen(true)}>{getBankInfo(rechargeAccount?.bankCode ?? "000")?.bankName} {rechargeAccount?.accountNo}</button>
                    <ChevronDown className="w-4 h-4"/>
                </div>
            </div>
            <div className="flex justify-between items-center gap-2 text-lg font-semibold mb-6">
                <div className="text-gray600">자동충전</div>
                <div className="flex items-center gap-1">
                    <span>{needCharge}원</span>
                </div>
            </div>

            <Button txt="보내기" state={true} onClick={submitBtnHandler}/>
        </div>
        {isAccountListModalOpen && 
            <div className="absolute inset-0 flex items-center justify-center">
                <MyAccountListModal setIsModalOpen={setIsAccountListModalOpen} setSelectedAccount={setSelectedAccount}/>
            </div>
        }
        </>
    );
}
