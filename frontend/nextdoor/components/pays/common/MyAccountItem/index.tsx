"use client"

import { getBankInfo } from "@/lib/utils/getBankInfo";
import { AddAccountResponseDto } from "@/types/pays/response";

interface MyAccountItemProps {
    account: AddAccountResponseDto;
}

export default function MyAccountItem({ account }: MyAccountItemProps) {
    return (
        <div
            key={account.bankCode} 
            className="flex items-center justify-between p-4 border border-gray400 rounded-lg">
            <div className="flex items-center gap-2">
                <img
                    src={getBankInfo(account.bankCode)?.image || ""}
                    alt={getBankInfo(account.bankCode)?.bankName || ""}
                    className="w-7 h-7 rounded-full"
                />
                <div className="text-lg font-bold">{getBankInfo(account.bankCode)?.bankName || ""}</div>
                <div>{account.accountNo}</div>
            </div>
            {account.isPrimary && <div className="text-white text-xs bg-blue400 px-2 py-1 rounded-lg">주계좌</div>}
        </div>            
    );
}
