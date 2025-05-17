"use client";

import HandleDepositModal from "@/components/pays/modals/HandleDepositModal";
import CompareAnalysis from "@/components/safe-deal/CompareAnalysis";
import GrayButton from "@/components/safe-deal/GrayButton";
import Header from "@/components/safe-deal/Header";
import useUserStore from "@/lib/store/useUserStore";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function SafeDealAfter() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const { userId } = useUserStore();
  if (!userId) {
    return;
  }
  return (
    <main className=" max-w-screen-sm mx-auto fixed inset-0  h-full bg-graygradient flex flex-col overflow-hidden">
      {/* Header: 고정 */}
      <div className="z-10">
        <Header txt="반납하기" />
      </div>

      {/* 스크롤 가능한 본문 */}
      <div className="flex-1 overflow-y-auto">
        <CompareAnalysis />
      </div>

      {/* 하단 버튼: 고정 */}
      <div className="z-10 p-4 bg-graygradient">
        <GrayButton txt="보증금 처리" onClick={() => setIsModalOpen(true)} />
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <div className="absolute inset-0 bg-gray900 flex items-center justify-center p-10 bg-opacity-70">
          <HandleDepositModal
            charge={10000}
            rentalImg=""
            rentalId={Number(id)}
            renterId={userId}
            setIsModalOpen={setIsModalOpen}
          />
        </div>
      )}
    </main>
  );
}
