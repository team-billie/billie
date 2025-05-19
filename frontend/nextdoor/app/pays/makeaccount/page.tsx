"use client"

import Button from "@/components/pays/common/Button";
import Header from "@/components/pays/common/Header";
import MakeAccountModal from "@/components/pays/modals/MakeAccountModal";
import SelectBankModal from "@/components/pays/modals/SelectBankModal";
import { CreateFinAccountRequest } from "@/lib/api/pays";
import useUserStore from "@/lib/store/useUserStore";
import { BankDto, getBankInfo } from "@/lib/utils/getBankInfo";
import { AddAccountRequestDto } from "@/types/pays/request";
import { CreateFinAccountResponseDto } from "@/types/pays/response";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useAlertStore } from "@/lib/store/useAlertStore";

export default function MakeAccountPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBank, setSelectedBank] = useState<BankDto | null>(null);
    const [isMakeAccountModalOpen, setIsMakeAccountModalOpen] = useState(false);
    const [account, setAccount] = useState<AddAccountRequestDto | null>(null);
    const userKey = useUserStore((state) => state.userKey);
    const { showAlert } = useAlertStore();

    const onSubmit = () => {
        setIsModalOpen(false);
        
        if(selectedBank){
            CreateFinAccountRequest({
                userKey: userKey,
                accountTypeUniqueNo: getBankInfo(selectedBank?.bankCode ?? "000")?.accountTypeUniqueNo ?? "",
            })
            .then((res: CreateFinAccountResponseDto) => {   
                console.log(res);
                setAccount({userKey: userKey, accountNo: res.REC.accountNo, bankCode: res.REC.bankCode, alias: "앱 계좌 등록"});
            })
            .catch((err) => {
                showAlert("계좌 생성에 실패했습니다.", "error");
            })
        } else {
            showAlert("은행을 선택해주세요.", "error");
        }
    }
    
    useEffect(() => {
        if (account) {
            console.log(account);
            setIsMakeAccountModalOpen(true);
        }
    }, [account]);
    
    return (
        <div className="relative h-[100dvh]">
            <Header txt="계좌 생성" />
            <div className="flex flex-col gap-5 justify-center p-4">
                <div className="flex flex-col gap-2">
                    <div className="text-2xl font-bold">어떤 은행으로</div>
                    <div className="text-2xl font-bold">계좌를 생성할까요?</div>
                </div>
                <div
                    onClick={() => setIsModalOpen(true)}
                    className="flex justify-between w-full py-5 px-4 border border-gray400 rounded-lg text-lg text-gray500 font-bold">
                    {selectedBank 
                        ? <div className="flex items-center gap-2 text-gray800">
                            <img
                                src={selectedBank.image}
                                alt={selectedBank.bankName}
                                className="w-7 h-7 rounded-full"
                            />
                            <div>{selectedBank.bankName}</div>
                        </div> 
                        : <div>은행 선택</div>}
                        <ChevronDown className="w-7 h-7 text-gray-700" />
                </div>
                <Button txt="계좌 생성" state={true} onClick={onSubmit} />
            </div>
            { isModalOpen && <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60">
                <SelectBankModal setIsModalOpen={setIsModalOpen} setSelectedBank={setSelectedBank} />
            </div>
            }
            { isMakeAccountModalOpen && account && 
                <div className="absolute inset-0 flex items-center justify-center p-10">
                    <MakeAccountModal account={account} />
                </div>
            }
        </div>
    )
}
