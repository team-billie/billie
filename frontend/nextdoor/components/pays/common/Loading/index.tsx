"use client";

import LoadingIcon from "@/components/common/LoadingIcon";
import Button from "@/components/pays/common/Button";
import Header from "@/components/pays/common/Header";
import { Check } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";

interface LoadingProps {
  type: string;
  isSuccess: boolean;
  headerTxt: string;
}

const steps = [
  "대여료가 결제되고 있어요!",
  "보증금이 빌리페이에 보관되고 있어요!",
];

export default function Loading({ type, isSuccess, headerTxt }: LoadingProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prevStep) => (prevStep + 1) % steps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header txt={headerTxt} x={false} />
      <div className="flex-1 flex flex-col items-center p-6">
        <div className="w-full flex-1 flex flex-col items-center gap-3 pt-60">
          {isSuccess
            ? <><Check className="w-16 h-16 text-white bg-blue400 mb-6 rounded-full p-2" />
              <div className="text-lg text-blue400 font-semibold">완료되었습니다!</div>
            </>
            : <><LoadingIcon />
              <div className="text-lg text-gray600 font-semibold">{steps[currentStep]}</div>
            </>}
        </div>
        <Button txt="확인" state={isSuccess} />
      </div>
    </>
  );
}

