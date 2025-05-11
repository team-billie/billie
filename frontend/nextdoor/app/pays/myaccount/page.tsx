"use client";

import Header from "@/components/pays/common/Header";
import MyAccountItem from "@/components/pays/common/MyAccountItem";
import useUserStore from "@/lib/store/useUserStore";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function MyAccountPage() {
    const { addedAccounts } = useUserStore();
    
    return (
        <div className="relative flex flex-col max-h-[100dvh]">
            <Header txt="내 계좌" />
            <div className="flex-1 overflow-y-auto flex flex-col gap-3 p-4">
                {addedAccounts?.map((account) => (
                    <MyAccountItem key={account.bankCode} account={account} />
                ))}
                <Link href="/pays/addaccount" className="flex flex items-center gap-2 p-4 border border-blue200 rounded-lg">
                    <Plus className="w-6 h-6 p-1 bg-blue200 text-blue400 rounded-full" />
                    <div className="text-lg font-bold">계좌 추가하기</div>
                </Link>
            </div>
        </div>
    )
}