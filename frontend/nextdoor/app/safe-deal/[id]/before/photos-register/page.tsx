"use client";

import Header from "@/components/safe-deal/Header";
import PhotoRegister from "@/components/safe-deal/PhotoRegister";

export default function SafeDealBefore() {
  return (
    <main className="relative min-h-[100dvh]">
      <Header txt={"결제하기"} />
      <PhotoRegister status="before" />
    </main>
  );
}
