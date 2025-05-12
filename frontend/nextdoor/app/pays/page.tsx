"use client";

import PayBox from "@/components/(tabs)/profile/PayBox";
import LinkHeader from "@/components/(tabs)/profile/LinkHeader";
import HistoryItem from "@/components/pays/(home)/HistoryItem";
import Header from "@/components/pays/common/Header";
import Button from "@/components/pays/common/Button";
import axiosInstance from "@/lib/api/instance";
import useUserStore from "@/lib/store/useUserStore";
import { GetAddedListRequest } from "@/lib/api/pays";
import { AddAccountResponseDto } from "@/types/pays/response";
import Link from "next/link";

export default function PayPage() {
  const { billyAccount, userKey, setBillyAccount, setAddedAccounts } = useUserStore();

  const handleAddBtn = () => {
    console.log(billyAccount, userKey);
    if (billyAccount && userKey) {
      // 돈입금
      axiosInstance.post("/api/v1/fintechs/accounts/deposit", {
          "userKey": userKey,
          "accountNo": billyAccount?.accountNo,
          "transactionBalance": 50000,
          "transactionSummary": "(수시입출금) : 빌리 입금"
        }).then((res) => {
          console.log(res);
          // 빌리페이 계좌 조회
          GetAddedListRequest(userKey).then((res: AddAccountResponseDto[]) => {
            console.log(res);
            setBillyAccount(res[0]);
          });
      });
    } else {
      alert("빌리페이 계좌가 없습니다.");
    }
  }

  return (
    <div className=" min-h-[100dvh]">
      <Header txt="billy pay" />
      <div className="flex flex-col gap-3 p-4">
        <PayBox type="pay" />
        <div className="flex-1 flex flex-col shadow-popup bg-white bg-opacity-80 p-4 rounded-2xl gap-3">
          <LinkHeader type="history" />
          <div className="flex flex-col gap-3 border-t pt-3">
            <HistoryItem img="none" name="곤약젤리 스트로우" date="25.05.08" type="transferPlus" amount="100" />
            <HistoryItem img="none" name="곤약젤리 스트로우" date="25.05.08" type="transferPlus" amount="100" />
            <HistoryItem img="none" name="곤약젤리 스트로우" date="25.05.08" type="transferPlus" amount="100" />
          </div>
        </div>
        <Button txt="빌리페이 돈 더하기" onClick={handleAddBtn} state={true} />
        {/* <Link href="/pays/payment/2">
          <Button txt="결제하기" state={false} />
        </Link> */}
      </div>
    </div>
  );
}