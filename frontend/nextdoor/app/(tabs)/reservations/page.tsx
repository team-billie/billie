import MainHeader from "@/components/common/Header/ReservationHeader";
import ReservationStatusTabs from "@/components/reservations/safe-deal/overview/ReservationStatusTabs";

import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "Reservation",
    description: "홈페이지입니다",
  };
}

export default function ReservationPage() {
  const items = [
    {
      title: "다이슨 헤어 드라이기",
      const: 10000,
    },
  ];
  return (
    <main>
      <MainHeader title="Reservations" />
      <ReservationStatusTabs />
      <div className="h-screen flex flex-col p-4"></div>
    </main>
  );
}
