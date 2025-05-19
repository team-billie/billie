"use client";

import LinkHeader from "@/components/(tabs)/profile/LinkHeader";
import PayBox from "@/components/(tabs)/profile/PayBox";
import HistoryItem from "@/components/pays/(home)/HistoryItem";
import Button from "@/components/pays/common/Button";
import Header from "@/components/pays/common/Header";
import axiosInstance from "@/lib/api/instance";
import { GetAddedListRequest, GetPaymentHistoryRequest } from "@/lib/api/pays";
import useUserStore from "@/lib/store/useUserStore";
import { GetPaymentHistoryRequestDto } from "@/types/pays/request";
import { BillyAccountHistory } from "@/types/pays/response";
import { useEffect, useState } from "react";
import { useAlertStore } from "@/lib/store/useAlertStore";

function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

function getFormattedDateRange(date: Date) {
  const first = new Date(date.getFullYear(), date.getMonth(), 1);
  const last = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  return {
    start: `${first.getFullYear()}${pad(first.getMonth() + 1)}${pad(first.getDate())}`,
    end: `${last.getFullYear()}${pad(last.getMonth() + 1)}${pad(last.getDate())}`,
  };
}

export default function PayPage() {
  const { billyAccount, userKey, setBillyAccount } = useUserStore();
  const [historyList, setHistoryList] = useState<BillyAccountHistory[]>([]);
  const { showAlert } = useAlertStore();
  const fetchHistory = async (accountNo: string) => {
    const { start, end } = getFormattedDateRange(new Date());
    const historyRequest: GetPaymentHistoryRequestDto = {
      userKey,
      accountNo,
      startDate: start,
      endDate: end,
      transactionType: "A",
      orderByType: "DESC",
    };

    try {
      const res = await GetPaymentHistoryRequest(historyRequest);
      setHistoryList(res.REC.list);
    } catch (error) {
      // showAlert("계좌 내역 조회 실패", "error");
    }
  };

  const handleAddBtn = async () => {
    if (!userKey || !billyAccount) {
      showAlert("빌리페이 계좌가 없습니다.", "error");
      return;
    }

    try {
      await axiosInstance.post("/api/v1/fintechs/accounts/deposit", {
        userKey,
        accountNo: billyAccount.accountNo,
        transactionBalance: 200000,
        transactionSummary: "(수시입출금) : 빌리 입금",
      });

      const accounts = await GetAddedListRequest(userKey);
      const updatedAccount = accounts[0];
      setBillyAccount(updatedAccount);

      await fetchHistory(updatedAccount.accountNo);
    } catch (error) {
      showAlert("빌리페이 입금 실패", "error");
    }
  };

  useEffect(() => {
    if (userKey && billyAccount?.accountNo) {
      fetchHistory(billyAccount.accountNo);
    }
  }, [userKey, billyAccount]);

  return (
    <div className="flex flex-col max-h-[100dvh]">
      <Header txt="billy pay" />
      <div className="flex-1 overflow-y-auto flex flex-col gap-3 p-4">
        <PayBox type="pay" />
        <div className="flex-1 overflow-y-auto flex flex-col shadow-popup bg-white bg-opacity-80 p-4 rounded-2xl gap-3">
          <LinkHeader type="history" />
          <div className="flex-1 overflow-y-auto flex flex-col gap-3 border-t pt-3">
            {historyList ? (
              historyList.map((item, i) => (
                <HistoryItem
                  key={i}
                  code={item.transactionAccountNo.slice(0, 3)}
                  name={item.transactionSummary}
                  date={item.transactionDate}
                  type={item.transactionType === "1" ? "transferPlus" : "transferMinus"}
                  amount={item.transactionBalance.toString()}
                />
              ))
            ) : (
              <div className="text-sm text-gray-400">내역이 없습니다.</div>
            )}
          </div>
        </div>
        <Button txt="빌리페이 돈 더하기" onClick={handleAddBtn} state={true} />
      </div>
    </div>
  );
}
