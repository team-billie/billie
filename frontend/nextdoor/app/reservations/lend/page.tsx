"use client";

import MainDock from "@/components/common/Dock/MainDock";
import MainHeader from "@/components/common/Header/ReservationHeader";
import ReservationStatusTabs from "@/components/reservations/safe-deal/overview/ReservationStatusTabs";

// import PhotoNotFound from "@/components/reservations/safe-deal/PhotoNotFound";

export default function ReservationLendPage() {
  return (
    <main>
      <MainHeader title="Reservations" />
      <ReservationStatusTabs />
      <div className="h-screen flex flex-col p-4"></div>
      <MainDock />
    </main>
  );
}
