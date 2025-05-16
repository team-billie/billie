"use client";

import EmptyState from "@/components/chats/list/EmptyState";
import MainDock from "@/components/common/Dock/MainDock";
import BorrowManageCard from "@/components/reservations/RentalCard/BorrowManageCard";
import ReservationManageNavbar from "@/components/reservations/manage/ReservationManageNavbar";
import {
  fetchOwnerReservations,
  fetchRenterReservations,
} from "@/lib/api/reservations/request";
import useUserStore from "@/lib/store/useUserStore";
import { useEffect, useState } from "react";

interface ReservationItem {
  id: number;
  img: string;
  postTitle: string;
  cost: number;
  deposit: number;
  date: number;
  startDate: string;
  endDate: string;
}

export default function ReservationBorrowManagePage() {
  const [items, setItems] = useState<ReservationItem[]>([]);
  const { userId } = useUserStore();
  console.log("ReservationBorrowManagePage userId:", userId);

  const loadReservations = async () => {
    if (!userId) return;

    try {
      const data = await fetchRenterReservations(userId);
      console.log(data);
      const mappedItems = data.map((item: any) => {
        const start = new Date(item.startDate);
        const end = new Date(item.endDate);
        const duration = Math.ceil((+end - +start) / (1000 * 60 * 60 * 24)) + 1;

        return {
          id: item.reservationId,
          img: "https://picsum.photos/seed/picsum/200/300",
          postTitle: item.postTitle,
          cost: item.rentalFee * duration,
          date: duration,
          startDate: item.startDate,
          endDate: item.endDate,
          deposit: item.deposit,
        };
      });

      setItems(mappedItems);
    } catch (error) {
      console.error("예약 목록 로딩 실패", error);
    }
  };

  useEffect(() => {
    loadReservations();
  }, [userId]);

  // userId가 없으면 렌더링하지 않음
  if (!userId) {
    return null;
  }

  return (
    <main>
      <ReservationManageNavbar />
      <div className="h-screen flex flex-col p-4 gap-4 mb-20">
        {items.length === 0 && <EmptyState userRole={"borrower"} />}
        {items.map((item) => (
          <div key={item.id}>
            <BorrowManageCard
              id={item.id}
              postTitle={item.postTitle}
              img={item.img}
              cost={item.cost}
              deposit={item.deposit}
              date={item.date}
              startDate={item.startDate}
              endDate={item.endDate}
              onReload={loadReservations}
            />
          </div>
        ))}
      </div>
      <MainDock />
    </main>
  );
}
