"use client"

import Button from "@/components/pays/common/Button"
import { formatNumberWithCommas } from "@/lib/utils/money";
import { useState } from "react";

type ChangeChargeProps = {
    setPayCharge: React.Dispatch<React.SetStateAction<number>>;
    setChangeBtnClicked: React.Dispatch<React.SetStateAction<boolean>>;
    payCharge: number;
};

export default function ChangeChare({ setChangeBtnClicked, setPayCharge, payCharge }: ChangeChargeProps) {
    const [charge, setCharge] = useState(payCharge);
    return (
        <>
            <div className="mt-5 font-bold text-xl">
                <div className="text-sm">대여료 <span className="text-blue400">{formatNumberWithCommas(payCharge)}원</span></div>
                <div>대여료를 얼마로 변경 할까요?</div>
            </div>

            <div className=" flex-1 flex flex-col gap-3 justify-end">
                <div className="border-b">
                    <input value={charge} onChange={(e) => setCharge(Number(e.target.value))} type="text" className="border-none px-1 text-2xl font-bold focus:outline-none focus:ring-0 placeholder-gray400" placeholder="금액을 입력해주세요." />
                </div>
                <div className="flex text-xs font-semibold text-gray500 gap-1">
                    <div className="border border-gray400 rounded-full flex items-center justify-center w-4 h-4">!</div>
                    <span>대여료와 보증금이 합산되어 결제 요청됩니다.</span>
                </div>
                <Button onClick={() => { setPayCharge(charge); setChangeBtnClicked(false) }} txt="확인" state={true} />
                <Button onClick={() => setChangeBtnClicked(false)} txt="변경취소" state={false} />
            </div>
        </>
    )
}