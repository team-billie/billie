"use client";

//송금하기 페이지
import Header from "@/components/pays/common/Header";
import AccountCheck from "@/components/pays/(withdraw)/AccountCheck";
import { useState } from "react";
import WithdrawAmount from "@/components/pays/(withdraw)/WithdrawAmount";


export default function WithdrawPage() {
  const [isPossibleAccount, setIsPossibleAccount] = useState(false);

  return (
      <div className="relative flex flex-col h-screen">
        <Header txt="계좌송금"/>
        { isPossibleAccount  
          ? <WithdrawAmount /> 
          : <AccountCheck setIsPossibleAccount={setIsPossibleAccount}/>}
      </div>
);
}