"use client";

import BeforeAnalysis from "@/components/safe-deal/BeforeAnalysis";
import GrayButton from "@/components/safe-deal/GrayButton";
import Header from "@/components/safe-deal/Header";
import Title from "@/components/safe-deal/Title";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SafeDealBefore() {
  const { id } = useParams();
  const router = useRouter();
  return (
    <main className="relative min-h-[100dvh] bg-graygradient flex flex-col">
      {/* 상단 영역: 스크롤 가능한 콘텐츠 */}
      <div className="flex-1 overflow-y-auto">
        <Header txt={"결제하기"} />
        <Title status="before" />
        <BeforeAnalysis />
      </div>
      <div className="p-4 items-end">
        <GrayButton
          txt="다음"
          onClick={() => router.push(`/safe-deal/${id}/before/payment`)}
        />
      </div>
    </main>
  );
}
