"use client";

import HandleDepositModal from "@/components/pays/modals/HandleDepositModal";
import CompareAnalysis from "@/components/safe-deal/CompareAnalysis";
import GrayButton from "@/components/safe-deal/GrayButton";
import Header from "@/components/safe-deal/Header";
import { AiAfterPhotosPostRequest } from "@/lib/api/ai-analysis/request";
import { GetReservationDetailRequest } from "@/lib/api/rental/request";
import useUserStore from "@/lib/store/useUserStore";
import { GetReservationDetailRequestDTO } from "@/types/rental/request";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SafeDealAfter() {
  const [reservation, setReservation] =
    useState<GetReservationDetailRequestDTO | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const { userId } = useUserStore();

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        await AiAfterPhotosPostRequest(Number(id));
        await fetchReservationDetail();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  const fetchReservationDetail = async () => {
    if (!id) return;
    const data = await GetReservationDetailRequest(Number(id));

    setReservation(data);
  };

  if (!userId || !id || !reservation) {
    return (
      <main className="max-w-screen-sm mx-auto fixed inset-0 h-full bg-graygradient flex items-center justify-center">
        <div className="text-center text-white">
          <span>로딩중중</span>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-screen-sm mx-auto fixed inset-0 h-full bg-graygradient flex flex-col overflow-hidden">
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
          {reservation && (
            <HandleDepositModal
              charge={reservation.deposit}
              rentalImg={reservation.productImageUrls[0]}
              rentalId={Number(id)}
              renterId={reservation.renterId}
              setIsModalOpen={setIsModalOpen}
            />
          )}
        </div>
      )}
    </main>
  );
}
