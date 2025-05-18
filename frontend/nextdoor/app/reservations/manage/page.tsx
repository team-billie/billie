"use client";

import EmptyState from "@/components/chats/list/EmptyState";
import MainDock from "@/components/common/Dock/MainDock";
import LendManageCard from "@/components/reservations/RentalCard/LendManageCard";
import ReservationManageNavbar from "@/components/reservations/manage/ReservationManageNavbar";
import { fetchOwnerReservations } from "@/lib/api/reservations/request";
import useUserStore from "@/lib/store/useUserStore";
import { useEffect, useState } from "react";

interface ReservationItem {
  id: number;
  img: string;
  postTitle: string;
  cost: number;
  date: number;
  startDate: string;
  deposit: number;
  endDate: string;
}

export default function ReservationManagePage() {
  const [items, setItems] = useState<ReservationItem[]>([]);
  const { userId } = useUserStore();

  const loadReservations = async () => {
    if (!userId) return;

    try {
      const data = await fetchOwnerReservations(userId);
      console.log(data);
      const mappedItems = data.map((item: any) => {
        const start = new Date(item.startDate);
        const end = new Date(item.endDate);
        const duration = Math.ceil((+end - +start) / (1000 * 60 * 60 * 24)) + 1;
        return {
          id: item.reservationId,
          img: item.postProductImage,
          postTitle: item.postTitle,
          cost: item.rentalFee * duration,
          date: duration,
          deposit: item.deposit,
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
      <div className="h-screen flex flex-col p-4 gap-4 mb-20">
        {items.length === 0 && <EmptyState userRole={"lender"} />}
        {items.map((item) => (
          <div key={item.id}>
            <LendManageCard
              id={item.id}
              postTitle={item.postTitle}
              img={item.img}
              cost={item.cost}
              date={item.date}
              startDate={item.startDate}
              deposit={item.deposit}
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
