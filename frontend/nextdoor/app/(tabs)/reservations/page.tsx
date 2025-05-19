"use client";

import { useEffect, useState } from "react";
import MainHeader from "@/components/common/Header/ReservationHeader";
import RentalCard from "@/components/reservations/RentalCard/RentalCard";
import ReservationStatusTabs from "@/components/reservations/safe-deal/overview/ReservationStatusTabs";
import { fetchRentals } from "@/lib/api/rental/request";
import { RentalProcess, RentalStatus } from "@/types/rental";
import useUserStore from "@/lib/store/useUserStore";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import EmptyState from "@/components/chats/list/EmptyState";
import LoadingSpinner from "@/components/common/LoadingSpinner.tsx";
import ErrorMessage from "@/components/common/ErrorMessage";

interface ReservationItem {
  id: number;
  img: string;
  title: string;
  cost: number;
  date: number;
  startDate: string;
  renterId: number;
  endDate: string;
  status: RentalStatus;
  process: RentalProcess;
  deposit: number;
  userType: "OWNER" | "RENTER";
}

export default function ReservationPage() {
  const [reservations, setReservations] = useState<ReservationItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useUserStore();
  const [condition, setCondition] = useState<string>("ACTIVE");

  const userRole: "OWNER" | "RENTER" = "RENTER";

  const stompClient = new Client({
    webSocketFactory: () =>
      new SockJS("http://k12e205.p.ssafy.io:8081/ws-rental"),
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    debug: (msg) => console.log("[STOMP]", msg),
  });

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
            date: diffDays + 1,
            cost: item.rentalFee,
            renterId: item.renterId,
            startDate: item.startDate,
            deposit: item.deposit,
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
  }, [userId, userRole, condition, process]);
  const handleActionSuccess = (rentalId: number) => {
    console.log(`예약 ID ${rentalId}의 상태가 변경되었습니다.`);
  };
  useEffect(() => {
    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, []);
  return (
    <main className="flex flex-col">
      <div>
        <MainHeader title="Reservations" />
        <ReservationStatusTabs
          selectedCondition={condition}
          onChangeCondition={(newCondition) => setCondition(newCondition)}
        />
      </div>
      <div className="flex flex-col m-4 gap-6">
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && reservations.length === 0 && (
          <EmptyState userRole={"borrower"} />
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
                renterId={reservation.renterId}
                endDate={reservation.endDate}
                deposit={reservation.deposit}
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
