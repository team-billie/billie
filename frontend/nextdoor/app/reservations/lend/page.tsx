"use client";

import MainDock from "@/components/common/Dock/MainDock";
import MainHeader from "@/components/common/Header/ReservationHeader";
import OwnerCard from "@/components/reservations/RentalCard/OwnerCard";
import ReservationStatusTabs from "@/components/reservations/safe-deal/overview/ReservationStatusTabs";

// import PhotoNotFound from "@/components/reservations/safe-deal/PhotoNotFound";

export default function ReservationLendPage() {
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
      <MainHeader title="Reservations" />
      <ReservationStatusTabs />
      <div className="h-screen overflow-y-auto p-4 flex flex-col gap-6">
        {items.map((item) => (
          <div key={item.title}>
            <OwnerCard
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
