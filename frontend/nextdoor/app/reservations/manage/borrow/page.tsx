"use client";

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
  title: string;
  cost: number;
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
        const duration = Math.ceil((+end - +start) / (1000 * 60 * 60 * 24));

        return {
          id: item.reservationId,
          img: "https://picsum.photos/seed/picsum/200/300",
          title: item.feedTitle,
          cost: item.rentalFee,
          date: duration,
          startDate: item.startDate,
          endDate: item.endDate,
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
      <div className="h-screen flex flex-col p-4 gap-4">
        {items.map((item) => (
          <div key={item.id}>
            <BorrowManageCard
              id={item.id}
              title={item.title}
              img={item.img}
              cost={item.cost}
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
