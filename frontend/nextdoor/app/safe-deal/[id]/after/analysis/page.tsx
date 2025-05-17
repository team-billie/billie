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
    <main className="fixed inset-0 w-full h-full bg-graygradient flex flex-col">
      <div className="fixed top-0 left-0 w-full z-10 bg-graygradient">
        <Header txt={"반납하기"} />
      </div>
      <div className=" pt-[64px] flex-1 overflow-y-auto">
        <CompareAnalysis />
      </div>
      <div className="p-4 items-end">
        <GrayButton txt="보증금 처리" onClick={() => setIsModalOpen(true)} />
      </div>
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
