"use client";

import CompareAnalysis from "@/components/safe-deal/CompareAnalysis";
import GrayButton from "@/components/safe-deal/GrayButton";
import Header from "@/components/safe-deal/Header";

export default function SafeDealAfter() {
  const depositBtnHandler = () => {};
  return (
    <main className="relative min-h-[100dvh] flex flex-col gap-4">
      <Header txt={"반납하기"} />
      <CompareAnalysis />
      <GrayButton txt="보증금 처리" onClick={() => depositBtnHandler()} />
    </main>
  );
}
