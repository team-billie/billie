"use client";

import MainDock from "@/components/common/Dock/MainDock";
import LendManageCard from "@/components/reservations/RentalCard/LendManageCard";
import ReservationManageNavbar from "@/components/reservations/manage/ReservationManageNavbar";
import { fetchOwnerReservations } from "@/lib/api/reservations/request";
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

export default function ReservationManagePage() {
  const [items, setItems] = useState<ReservationItem[]>([]);

  const loadReservations = async () => {
    try {
      const data = await fetchOwnerReservations();
      console.log(data);
      const mappedItems = data.map((item: any) => {
        const start = new Date(item.startDate);
        const end = new Date(item.endDate);
        const duration = Math.ceil((+end - +start) / (1000 * 60 * 60 * 24));

        return {
          id: item.reservationId,
          img:
            // item.feedProductImage ??
            "https://picsum.photos/seed/picsum/200/300",
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
  }, []);

  return (
    <main>
      <ReservationManageNavbar />
      <div className="h-screen flex flex-col p-4 gap-4">
        {items.map((item) => (
          <div key={item.id}>
            <LendManageCard
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
