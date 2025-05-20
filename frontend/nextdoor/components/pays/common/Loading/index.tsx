"use client";

import LoadingIcon from "@/components/common/LoadingIcon";
import Button from "@/components/pays/common/Button";
import Header from "@/components/pays/common/Header";
import { Check, CircleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";

interface LoadingProps {
  type: string;
  status: 'loading' | 'success' | 'error';
  headerTxt: string;
}

// steps type별로 구분
const steps = {
  payment: [
    "대여료가 결제되고 있어요!",
    "보증금이 빌리페이에 보관되고 있어요!",
  ],
  recharge: [
    "빌리페이에 돈을 충전하고 있어요!",
  ],
  withdraw: [
    "빌리페이에서 돈을 출금하고 있어요!",
  ],
};

export default function Loading({ type, status, headerTxt }: LoadingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prevStep) => (prevStep + 1) % steps[type as keyof typeof steps].length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header txt={headerTxt} x={false} color="bg-gray100 text-blue400" />
      <div className="flex-1 bg-gray100 flex flex-col items-center p-6">
        <div className="w-full flex-1 flex flex-col items-center gap-3 pt-60">
        {status === 'success' ? (
          <>
            <Check className="w-16 h-16 text-white bg-blue400 mb-4 rounded-full p-2" />
            <div className="text-lg text-blue400 font-semibold">완료되었습니다!</div>
          </>
        ) : status === 'error' ? (
          <>
            <CircleAlert className="w-16 h-16 text-white bg-[#FF637D] mb-4 rounded-full p-2" />
            <div className="text-lg text-[#FF637D] font-semibold">{headerTxt}에 실패했어요!</div>
          </>
        ) : (
          <>
            <LoadingIcon />
            <div className="text-lg text-gray600 font-semibold">{steps[type as keyof typeof steps][currentStep]}</div>
          </>
        )}
        </div>
        <Button txt="확인" onClick={() => {
            router.push("/profile");
        }} state={status === 'loading' ? false : true} />
      </div>
    </>
  );
}

