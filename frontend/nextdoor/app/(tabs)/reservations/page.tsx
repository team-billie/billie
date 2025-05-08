"use client";

import MainHeader from "@/components/common/Header/ReservationHeader";
import RentalCard from "@/components/reservations/RentalCard/RentalCard";
import ReservationStatusTabs from "@/components/reservations/safe-deal/overview/ReservationStatusTabs";
import { RENTAL_STATUS, RentalProcess, RentalStatus } from "@/types/rental";
import { useEffect, useState } from "react";

interface ReservationItem {
  id: number;
  img: string;
  title: string;
  cost: number;
  date: number; // 대여 일수
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

  // API에서 데이터 가져오기 (실제 구현에서는 주석 해제)
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);
        // 실제 API 호출
        // const response = await axiosInstance.get('/api/reservations');
        // const data = response.data;

        // 테스트용 모의 데이터
        const mockData: ReservationResponse[] = [
          {
            reservationId: 123,
            startDate: "2025-05-01T10:00:00",
            endDate: "2025-05-03T18:00:00",
            rentalFee: 15000,
            deposit: 5000,
            reservationStatus: "CONFIRMED",
            ownerId: 45,
            renterId: 67,
            rentalId: 890,
            rentalStatus: "RENTAL_COMPLETED",
            rentalProcess: "RENTAL_COMPLETED",
            title: "아이맥 레이 4",
            productImageUrl: "https://picsum.photos/seed/picsum/200/300",
          },
          {
            reservationId: 124,
            startDate: "2025-05-10T09:00:00",
            endDate: "2025-05-12T17:00:00",
            rentalFee: 20000,
            deposit: 10000,
            reservationStatus: "PENDING",
            ownerId: 45,
            renterId: 68,
            rentalId: 891,
            rentalStatus: "CREATED",
            rentalProcess: "BEFORE_RENTAL",
            title: "맥북 프로 2024",
            productImageUrl: "https://picsum.photos/seed/macbook/200/300",
          },
        ];

        // API 응답 데이터를 컴포넌트에서 사용할 형식으로 변환
        const formattedData = mockData.map((item) => {
          // 대여 기간 계산 (일수)
          const startDate = new Date(item.startDate);
          const endDate = new Date(item.endDate);
          const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          // API 응답의 rentalStatus를 RentalStatus 타입으로 매핑
          // let status: RentalStatus;
          // switch (item.rentalStatus) {
          //   case "RENTAL_IN_PROGRESS":
          //     status = RENTAL_STATUS.REMITTANCE_CONFIRMED;
          //     break;
          //   case "CREATED":
          //     status = RENTAL_STATUS.CREATED;
          //     break;
          //   // 필요에 따라 다른 상태 매핑 추가
          //   default:
          //     status = RENTAL_STATUS.CREATED;
          // }

          return {
            id: item.rentalId,
            img: item.productImageUrl,
            title: item.title,
            cost: item.rentalFee,
            date: diffDays,
            startDate: item.startDate.split("T")[0], // YYYY-MM-DD 형식으로 변환
            endDate: item.endDate.split("T")[0],
            status: item.rentalStatus,
            process: item.rentalProcess,
            userType: "RENTER", // 현재 페이지가 소유자 대여 페이지라고 가정
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

    fetchReservations();
  }, []);

  // 예약 상태 변경 시 처리 함수
  const handleActionSuccess = (rentalId: number) => {
    console.log(`예약 ID ${rentalId}의 상태가 변경되었습니다.`);
  };

  return (
    <main>
      <MainHeader title="Reservations" />
      <ReservationStatusTabs />
      <div className="h-screen overflow-y-auto p-4 flex flex-col gap-6">
        {reservations.map((reservation) => (
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
