"use client";

import EmptyState from "@/components/chats/list/EmptyState";
import MainDock from "@/components/common/Dock/MainDock";
import ErrorMessage from "@/components/common/ErrorMessage";
import MainHeader from "@/components/common/Header/ReservationHeader";
import LoadingSpinner from "@/components/common/LoadingSpinner.tsx";
import RentalCard from "@/components/reservations/RentalCard/RentalCard";
import ReservationStatusTabs from "@/components/reservations/safe-deal/overview/ReservationStatusTabs";
import { fetchRentals } from "@/lib/api/rental/request";
import useUserStore from "@/lib/store/useUserStore";
import { RentalProcess, RentalStatus } from "@/types/rental";
import { useEffect, useState } from "react";

// import PhotoNotFound from "@/components/reservations/safe-deal/PhotoNotFound";

interface ReservationItem {
  id: number;
  img: string;
  title: string;
  cost: number;
  date: number;
  startDate: string;
  endDate: string;
  status: RentalStatus;
  renterId: number;
  process: RentalProcess;
  deposit: number;
  userType: "OWNER" | "RENTER";
}

export default function ReservationLendPage() {
  const [reservations, setReservations] = useState<ReservationItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useUserStore();
  const [condition, setCondition] = useState<string>("ACTIVE");
  console.log("ReservationLendPage userId:", userId);

  const userRole: "OWNER" | "RENTER" = "OWNER";

  useEffect(() => {
    const fetchReservationData = async () => {
      if (!userId) return;

      try {
        setLoading(true);

        const data: ReservationResponseDTO[] = await fetchRentals({
          userId,
          userRole,
          condition,
          page: 0,
          size: 10,
        });
        console.log(data);
        const formattedData: ReservationItem[] = data.map((item) => {
          const start = new Date(item.startDate);
          const end = new Date(item.endDate);
          const diffDays = Math.ceil(
            (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
          );

          return {
            id: item.rentalId,
            img: item.productImageUrls[0],
            title: item.title,
            cost: item.rentalFee,
            date: diffDays + 1,
            startDate: item.startDate,
            renterId: item.renterId,
            endDate: item.endDate,
            deposit: item.deposit,
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

    fetchReservationData();
  }, [userId, condition]);

  function handleActionSuccess(id: number): void {
    throw new Error("Function not implemented.");
  }

  // userId가 없으면 렌더링하지 않음
  if (!userId) {
    return null;
  }

  // 로딩 상태 처리
  if (loading) {
    return (
      <main>
        <MainHeader title="Reservations" />
        <div className="h-screen flex items-center justify-center">
          <p>로딩 중...</p>
        </div>
      </main>
    );
  }

  // 오류 상태 처리
  if (error) {
    return (
      <main>
        <MainHeader title="Reservations" />
        <div className="h-screen flex items-center justify-center">
          <p className="text-red-500">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <MainHeader title="Reservations" />
      <ReservationStatusTabs
        selectedCondition={condition}
        onChangeCondition={(newCondition) => setCondition(newCondition)}
      />
      <div className="h-screen overflow-y-auto p-4 flex flex-col gap-6">
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && reservations.length === 0 && (
          <EmptyState userRole={"lender"} />
        )}
        {!loading &&
          !error &&
          reservations &&
          reservations.map((reservation) => (
            <div key={reservation.id}>
              <RentalCard
                title={reservation.title}
                img={reservation.img}
                cost={reservation.cost}
                date={reservation.date}
                startDate={reservation.startDate}
                endDate={reservation.endDate}
                renterId={reservation.renterId}
                status={reservation.status}
                process={reservation.process}
                userType={reservation.userType}
                rentalId={reservation.id}
                deposit={reservation.deposit}
                onActionSuccess={() => handleActionSuccess(reservation.id)}
              />
            </div>
          ))}
      </div>
      <MainDock />
    </main>
  );
}
