"use client";

import { useEffect, useState } from "react";
import useUserStore from "@/lib/store/useUserStore";
import MyAccountItem from "@/components/pays/common/MyAccountItem";
import { AddAccountResponseDto } from "@/types/pays/response";
import { Plus } from "lucide-react";
import Link from "next/link";
interface AccountListModalProps {
    setIsModalOpen: (isModalOpen: boolean) => void;
    setSelectedAccount: (account: AddAccountResponseDto) => void;
    type?: "small";
}

export default function MyAccountListModal({ setIsModalOpen, setSelectedAccount, type }: AccountListModalProps) {
    const [isVisible, setIsVisible] = useState(false);
    const { addedAccounts } = useUserStore();

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleBankBtnClick = (bank: AddAccountResponseDto) => {
        setIsModalOpen(false);
        setIsVisible(false);
        setTimeout(() => setIsModalOpen(false), 300);
        setSelectedAccount(bank);
    }

    return (
        <>
        <div className={`h-[40dvh] absolute bottom-0 bg-white rounded-t-2xl w-full flex flex-col gap-2 border-t ${type === "small" ? "p-4 py-6" : "p-6"} transform transition-transform duration-500 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
            <div className="text-gray900 text-2xl font-semibold mb-2">어떤 계좌에서 가져올까요?</div>
            <div className="overflow-y-auto flex flex-col gap-3">
                {addedAccounts?.map((account: AddAccountResponseDto) => (
                    <button key={account.bankCode} onClick={() => handleBankBtnClick(account)}>
                        <MyAccountItem type={type} account={account} />
                    </button>
                ))}
                <Link href="/pays/addaccount" className={`${type === "small" ? "p-2 py-3" : "p-4"} flex flex items-center gap-2 border border-blue200 rounded-lg`}>
                    <Plus className="w-6 h-6 p-1 bg-blue200 text-blue400 rounded-full" />
                    <div className="text-lg font-bold">계좌 추가하기</div>
                </Link>
            </div>
            {/* <Button txt="보내기" state={true} onClick={submitBtnHandler}/> */}
        </div>

        </>
    );
}
