"use client";

import EnterAccount from "@/components/pays/common/EnterAccount";
import MyAccountItem from "@/components/pays/common/MyAccountItem";
import useUserStore from "@/lib/store/useUserStore";
import { CheckAccountRequestDto } from "@/types/pays/request";

interface AccountCheckProps {
    setIsPossibleAccount: (isPossibleAccount: boolean) => void;
}

export default function AccountCheck({setIsPossibleAccount}: AccountCheckProps) {
    const { addedAccounts } = useUserStore();

    const handleAccountSelected = (selectedAccount: CheckAccountRequestDto) => {
        // 계좌 정보 확인 코드 백엔드 구현후 작성예정
        console.log(selectedAccount);
        setIsPossibleAccount(true);
    }
     
    return (
        <div className="flex-1 overflow-y-auto flex flex-col gap-3 p-4">
            <EnterAccount 
                btnTxt="다음" 
                handleAccountSelected={handleAccountSelected}/>
            <div className="text-lg font-bold">내 계좌</div>
            <div className="overflow-y-auto flex flex-col gap-3">
                {addedAccounts?.map((account) => (
                    <button 
                        key={account.bankCode} 
                        onClick={() => 
                            handleAccountSelected({
                                bankCode: account.bankCode,
                                accountNo: account.accountNo,
                            })
                        }>
                        <MyAccountItem account={account} />
                    </button>
                ))}
            </div>
        </div>
    );
}
