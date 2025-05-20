"use client";

import HandleDepositModal from "@/components/pays/modals/HandleDepositModal";
import CompareAnalysis from "@/components/safe-deal/CompareAnalysis";
import GrayButton from "@/components/safe-deal/GrayButton";
import Header from "@/components/safe-deal/Header";
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
  const [isLoading, setIsLoading] = useState(true);
  const fetchReservationDetail = async () => {
    try {
      setIsLoading(true);
      if (!id) {
        console.error("예약 ID가 없습니다");
        return;
      }

      console.log("데이터 요청 시작:", id);
      const data = await GetReservationDetailRequest(Number(id));
      console.log("받은 데이터:", data);

      if (data) {
        setReservation(data);
      } else {
        console.error("응답 데이터가 없습니다");
      }
    } catch (error) {
      console.error("예약 정보 가져오기 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!userId) {
      console.log("userId가 없습니다. 로그인이 필요합니다.");
      return;
    }
    console.log("userId 확인됨:", userId);
    fetchReservationDetail();
  }, [id, userId]);

  const handleOpenModal = () => {
    console.log("모달 열기 시도", { isModalOpen: true, reservation });
    setIsModalOpen(true);
  };
  return (
    <main className="flex flex-col min-h-screen bg-graygradient">
      <div className="flex-1 overflow-y-auto">
        <Header txt="반납하기" />
        <CompareAnalysis />
      </div>

      <div className="p-4">
        <GrayButton txt="보증금 처리" onClick={() => setIsModalOpen(true)} />
      </div>

      {isModalOpen && reservation && (
        <div className="absolute inset-0 bg-gray900 bg-opacity-70 flex items-center justify-center p-10">
          <HandleDepositModal
            charge={reservation.deposit}
            rentalImg={reservation.productImageUrls[0]}
            rentalId={Number(id)}
            renterId={reservation.renterId}
            setIsModalOpen={setIsModalOpen}
          />
        </div>
      )}
    </main>
  );
}
