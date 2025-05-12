"use client";

//송금하기 페이지
import Header from "@/components/pays/common/Header";
import AccountCheck from "@/components/pays/(withdraw)/AccountCheck";
import { useState } from "react";
import WithdrawAmount from "@/components/pays/(withdraw)/WithdrawAmount";
import { CheckAccountRequestDto } from "@/types/pays/request";


export default function WithdrawPage() {
  const [isPossibleAccount, setIsPossibleAccount] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<CheckAccountRequestDto | null>(null);

  return (
      <div className="relative flex flex-col h-[100dvh]">
        <Header txt="계좌송금"/>
        { isPossibleAccount  
          ? <WithdrawAmount selectedAccount={selectedAccount}/> 
          : <AccountCheck setIsPossibleAccount={setIsPossibleAccount} setSelectedAccount={setSelectedAccount}/>}
      </div>
);
}