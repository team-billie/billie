// 송금하기, 계좌등록 페이지에서 사용
"use client";

import { ChevronDown } from "lucide-react"
import SelectBankModal from "../../modals/SelectBankModal";
import { useState } from "react";
import { AccountInput } from "../Input";
import Button from "../Button";
import { BankDto } from "@/lib/utils/getBankInfo";

interface EnterAccountProps {
    btnTxt: string;
    selectedBank: BankDto | null;
    setSelectedBank: (selectedBank: BankDto | null) => void;
    onClick: () => void;
}

export default function EnterAccount({btnTxt, selectedBank, setSelectedBank, onClick}: EnterAccountProps) {     
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="w-full flex flex-col items-center gap-3">
                <AccountInput />
                
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

                <Button txt={btnTxt} state={true} onClick={onClick}/>
            </div>
            {isModalOpen && 
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60">
                    <SelectBankModal setIsModalOpen={setIsModalOpen} setSelectedBank={setSelectedBank}/>
                </div>
            }
        </>
    );
}
