"use client";

import GrayButton from "@/components/safe-deal/GrayButton";
import Header from "@/components/safe-deal/Header";
import Payment from "@/components/safe-deal/Payment";
import { useParams, useRouter } from "next/navigation";

export default function SafeDealBefore() {
  const { id } = useParams();
  const router = useRouter();
  return (
    <main className="relative min-h-[100dvh]">
      <Header txt={"결제하기"} />
      <Payment />
    </main>
  );
}
