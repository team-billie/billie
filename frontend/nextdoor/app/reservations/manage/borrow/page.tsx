"use client";

import MainDock from "@/components/common/Dock/MainDock";
import BorrowManageCard from "@/components/reservations/RentalCard/BorrowManageCard";
import ReservationManageNavbar from "@/components/reservations/manage/ReservationManageNavbar";

export default function ReservationBorrowManagePage() {
  const items = [
    {
      img: "https://picsum.photos/seed/picsum/200/300",
      title: "다이슨 헤어 드라이기",
      cost: 10000,
      date: 3,
      startDate: "2025-05-05",
      endDate: "2025-05-10",
    },
    {
      img: "https://picsum.photos/seed/picsum/200/300",
      title: "에어팟 맥스",
      cost: 20000,
      date: 3,
      startDate: "2025-05-05",
      endDate: "2025-05-10",
    },
  ];
  return (
    <main>
      <ReservationManageNavbar />
      <div className="h-screen flex flex-col p-4 gap-4">
        {items.map((item) => (
          <div key={item.title}>
            <BorrowManageCard
              title={item.title}
              img={item.img}
              cost={item.cost}
              date={item.date}
              startDate={item.startDate}
              endDate={item.endDate}
            />
          </div>
        ))}
      </div>
      <MainDock />
    </main>
  );
}
