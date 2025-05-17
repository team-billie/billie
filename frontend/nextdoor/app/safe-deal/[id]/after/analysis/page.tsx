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
    <main className="relative min-h-[100dvh] flex flex-col gap-4">
      <Header txt={"반납하기"} />
      <CompareAnalysis />
      <GrayButton txt="보증금 처리" onClick={() => setIsModalOpen(true)} />
      {isModalOpen && (
        <div className="absolute inset-0 bg-gray900 flex-1 flex items-center justify-center p-10 bg-opacity-70">
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
