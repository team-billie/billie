"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import LinkHeader from "@/components/(tabs)/profile/LinkHeader";
import useUserStore from "@/lib/store/useUserStore";
import { useEffect } from "react";
import { GetAddedListRequest } from "@/lib/api/pays";
import { AddAccountResponseDto } from "@/types/pays/response";
interface PayBoxProps {
  type: "profile" | "pay";
}

const BillyPayBox = ({ type }: PayBoxProps) => {
  const { billyAccount, userKey, setBillyAccount, setAddedAccounts } = useUserStore();

  useEffect(() => {
      GetAddedListRequest(userKey).then((res: AddAccountResponseDto[]) => {
        console.log(res);
        setBillyAccount(res[0]);

        if (res.length > 1) {
          setAddedAccounts(res.slice(1));
        }
      });
  }, []);

  return (
    <div className={`${type === "pay" ? "bg-blue100" : "bg-white"} flex items-cente p-4 rounded-lg`}>
      <div className="text-lg font-semibold text-blue400">billy pay</div>
      <div className="flex-1 flex justify-end text-gray900 text-xl font-bold">
        <span>{billyAccount?.balance}</span>
        <span>원</span>
      </div>
      {type === "profile" && <ChevronRight className="text-gray600" />}
    </div>
  )
}

export default function PayBox({ type }: PayBoxProps) {

  return (
    <div className="flex flex-col shadow-popup bg-white bg-opacity-80 p-4 rounded-2xl gap-3">
      <div className="flex items-center justify-between">
        <LinkHeader type="account" />
        <Link href="/pays/myaccount" className="text-sm bg-blue300 text-white py-1 px-2 rounded-lg">내 계좌</Link>
      </div>

      {type === "profile"
        ? <Link href="/pays/">
          <BillyPayBox type={type} />
        </Link>
        : <BillyPayBox type={type} />
      }

      <div className="grid grid-cols-2 gap-3 text-white">
        <Link href="/pays/recharge" className="w-full text-center bg-blue300 py-[10px] rounded-lg">충전하기</Link>
        <Link href="/pays/withdraw" className="w-full text-center bg-blue300 py-[10px] rounded-lg">송금하기</Link>
      </div>
    </div>
  )
}