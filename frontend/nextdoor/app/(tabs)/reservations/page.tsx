"use client";

import { useEffect, useState } from "react";
import MainHeader from "@/components/common/Header/ReservationHeader";
import RentalCard from "@/components/reservations/RentalCard/RentalCard";
import ReservationStatusTabs from "@/components/reservations/safe-deal/overview/ReservationStatusTabs";
import { fetchRentals } from "@/lib/api/rental/request";
import { RentalProcess, RentalStatus } from "@/types/rental";
import useUserStore from "@/lib/store/useUserStore";

interface ReservationItem {
  id: number;
  img: string;
  title: string;
  cost: number;
  date: number;
  startDate: string;
  endDate: string;
  status: RentalStatus;
  process: RentalProcess;
  userType: "OWNER" | "RENTER";
}

export default function ReservationPage() {
  const [reservations, setReservations] = useState<ReservationItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useUserStore();
  const userRole: "OWNER" | "RENTER" = "RENTER";
  const condition = "ALL";
  useEffect(() => {
    const fetchReservationData = async () => {
      try {
        setLoading(true);
        setError(null); // 에러 상태 초기화

        const data: ReservationResponseDTO[] = await fetchRentals({
          userId: userId || 1,
          userRole,
          condition,
          page: 0,
          size: 10,
        });

        const formattedData: ReservationItem[] = data.map((item) => {
          const start = new Date(item.startDate);
          const end = new Date(item.endDate);
          const diffDays = Math.ceil(
            (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
          );

          return {
            id: item.rentalId,
            img: item.productImageUrl,
            title: item.title,
            cost: item.rentalFee,
            date: diffDays,
            startDate: item.startDate,
            endDate: item.endDate,
            status: item.rentalStatus as RentalStatus,
            process: item.rentalProcess as RentalProcess,
            userType: userRole,
          };
        });

        setReservations(formattedData);
      } catch (err) {
        console.error("Error fetching reservations:", err);
        setError("예약 목록을 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchReservationData();
    }
  }, [userId, userRole, condition]);
  const handleActionSuccess = (rentalId: number) => {
    console.log(`예약 ID ${rentalId}의 상태가 변경되었습니다.`);
  };

  return (
    <main className="flex flex-col">
      <div>
        <MainHeader title="Reservations" />
        <ReservationStatusTabs />
      </div>
      <div className="flex flex-col m-4">
        {loading && <p>불러오는 중입니다...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading &&
          !error &&
          reservations.map((reservation) => (
            <div key={reservation.id}>
              <RentalCard
                title={reservation.title}
                img={reservation.img}
                cost={reservation.cost}
                date={reservation.date}
                startDate={reservation.startDate}
                endDate={reservation.endDate}
                status={reservation.status}
                process={reservation.process}
                userType={reservation.userType}
                rentalId={reservation.id}
                onActionSuccess={() => handleActionSuccess(reservation.id)}
              />
            </div>
          ))}
      </div>
    </main>
  );
}
