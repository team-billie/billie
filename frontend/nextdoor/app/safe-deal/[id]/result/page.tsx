"use client";

import CompareAnalysis from "@/components/safe-deal/CompareAnalysis";
import DoneReport from "@/components/safe-deal/DoneReport";
import Header from "@/components/safe-deal/Header";
import useUserStore from "@/lib/store/useUserStore";

export default function SafeDealResult() {
  const { userId } = useUserStore();
  if (!userId) {
    return;
  }
  return (
    <main className=" max-w-screen-sm mx-auto fixed inset-0  h-full bg-graygradient flex flex-col overflow-hidden">
      {/* Header: 고정 */}
      <div className="z-10">
        <Header txt="AI 안심거래" />
      </div>

      {/* 스크롤 가능한 본문 */}
      <div className="flex-1 overflow-y-auto">
        <DoneReport />
      </div>
    </main>
  );
}
