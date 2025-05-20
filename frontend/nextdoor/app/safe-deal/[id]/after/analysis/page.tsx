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

  const fetchReservationDetail = async () => {
    if (!id) return;
    const data = await GetReservationDetailRequest(Number(id));

    setReservation(data);
  };
  useEffect(() => {
    if (!userId) {
      return;
    }
    fetchReservationDetail();
  }, [id]);

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
