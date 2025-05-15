"use client";

import Header from "@/components/pays/common/Header";
import BeforePayment from "@/components/safe-deal/BeforePayment";
import Payment from "@/components/safe-deal/Payment";
import { RENTAL_PROCESS, RentalProcess } from "@/types/rental";
import { useEffect, useState } from "react";

export default function SafeDealBefore() {
  const [step, setStep] = useState<RentalProcess>();
  const steps = [
    { value: RENTAL_PROCESS.BEFORE_RENTAL },
    { value: RENTAL_PROCESS.RENTAL_IN_ACTIVE },
    { value: RENTAL_PROCESS.RETURNED },
    { value: RENTAL_PROCESS.RENTAL_COMPLETED },
  ];

  //1.rentalId로 현재 상태 조회하기
  //2.해당 rental process에 ,status에 맞는 화면 띄우기
  //안심사진 등록 전
  //등록 후 AI분석

  //AI분석 확인 후 결제 창
  useEffect(() => {
    setStep(RENTAL_PROCESS.BEFORE_RENTAL);
  });
  return (
    <main className="relative min-h-[100dvh]">
      <Header txt={"결제하기"} x={true} />
      {step === RENTAL_PROCESS.BEFORE_RENTAL && <BeforePayment />}
      {step === RENTAL_PROCESS.RENTAL_IN_ACTIVE && <Payment />}
    </main>
  );
}
