"use client";
// import PhotoNotFound from "@/components/reservations/safe-deal/PhotoNotFound";
import PhotoNotFound from "@/components/reservations/safe-deal/result/PhotoNotFound";
import ResultSummary from "@/components/reservations/safe-deal/result/ResultSummary";
import { useState } from "react";

export default function SafeDealResult() {
  const [isResult, setIsResult] = useState(true);
  return (
    <main>
      <div className="h-screen flex flex-col p-4">
        <div className="pb-4">
          <div className="text-xl text-gray900">
            우리의 물품이 얼마나 일치할까?
          </div>
          <div className="text-sm text-gray700">
            AI를 통해 대여 전/후 물품의 일치율을 체크해 보세요.
          </div>
        </div>

        <div className="flex-1">
          {isResult ? <ResultSummary /> : <PhotoNotFound />}
        </div>
      </div>
    </main>
  );
}
