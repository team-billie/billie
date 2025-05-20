"use client";

import Header from "@/components/safe-deal/Header";
import Payment from "@/components/safe-deal/Payment";

export default function SafeDealBefore() {
  return (
    <main className="relative h-[100dvh] flex flex-col">
      <Payment />
    </main>
  );
}
