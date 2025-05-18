"use client";

import Header from "@/components/safe-deal/Header";
import Payment from "@/components/safe-deal/Payment";

export default function SafeDealBefore() {
  return (
    <main className="relative h-full flex flex-col">
      <Header txt={"결제하기"} />
      <Payment />
    </main>
  );
}
