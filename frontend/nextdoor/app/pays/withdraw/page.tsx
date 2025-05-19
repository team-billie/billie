"use client";

//송금하기 페이지
import Header from "@/components/pays/common/Header";
import AccountCheck from "@/components/pays/(withdraw)/AccountCheck";
import { useState } from "react";
import WithdrawAmount from "@/components/pays/(withdraw)/WithdrawAmount";
import { VerifyAccountRequestDto } from "@/types/pays/request";
import { VerifyAccountRequest } from "@/lib/api/pays";
import { VerifyAccountResponseDto } from "@/types/pays/response";
import { useAlertStore } from "@/lib/store/useAlertStore";

export default function WithdrawPage() {
  const [isPossibleAccount, setIsPossibleAccount] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<VerifyAccountRequestDto | null>(null);
  const [verifiedAccount, setVerifiedAccount] = useState<VerifyAccountResponseDto | null>(null);
  const { showAlert } = useAlertStore();

  // 계좌 확인
  const handleVerifyAccount = (account: VerifyAccountRequestDto) => {
    VerifyAccountRequest(account)
      .then((res) => {
        setVerifiedAccount(res);
        setIsPossibleAccount(true);
      })
      .catch((err) => {
        showAlert("계좌 확인에 실패했습니다.", "error");
      })
    
  }

  return (
      <div className="relative flex flex-col h-[100dvh]">
        <Header txt="계좌송금"/>
        { isPossibleAccount  
          ? <WithdrawAmount verifiedAccount={verifiedAccount}/> 
          : <AccountCheck handleVerifyAccount={handleVerifyAccount} setIsPossibleAccount={setIsPossibleAccount} setSelectedAccount={setSelectedAccount}/>}
      </div>
);
}