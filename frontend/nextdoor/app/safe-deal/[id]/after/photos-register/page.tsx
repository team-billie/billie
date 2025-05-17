"use client";

import Header from "@/components/safe-deal/Header";
import PhotoRegister from "@/components/safe-deal/PhotoRegister";

export default function SafeDealAfter() {
  return (
    <main className="relative min-h-[100dvh]">
      <Header txt={"반납하기"} />
      <PhotoRegister status={"after"} />
    </main>
  );
}
