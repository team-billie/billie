"use client";

import EnterAccount from "@/components/pays/common/EnterAccount";
import MyAccountItem from "@/components/pays/common/MyAccountItem";
import useUserStore from "@/lib/store/useUserStore";
import { VerifyAccountRequestDto } from "@/types/pays/request";

interface AccountCheckProps {
    setIsPossibleAccount: (isPossibleAccount: boolean) => void;
    setSelectedAccount: (selectedAccount: VerifyAccountRequestDto) => void;
    handleVerifyAccount: (account: VerifyAccountRequestDto) => void;
}

export default function AccountCheck({setIsPossibleAccount, setSelectedAccount, handleVerifyAccount}: AccountCheckProps) {
    const { addedAccounts } = useUserStore();

    const handleAccountSelected = (selectedAccount: VerifyAccountRequestDto) => {
        // 계좌 정보 확인 코드 백엔드 구현후 작성예정
        console.log(selectedAccount);
        handleVerifyAccount(selectedAccount);
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
