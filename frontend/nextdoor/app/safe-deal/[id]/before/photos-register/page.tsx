"use client";

import Header from "@/components/safe-deal/Header";
import PhotoRegister from "@/components/safe-deal/PhotoRegister";

export default function SafeDealBefore() {
  return (
    <main className="relative max-h-[100dvh] max-w-screen-sm  bg-graygradient flex flex-col justify-between">
      {/* Header 고정 */}
      <div className="sticky top-0 left-0 w-full z-10 bg-graygradient ">
        <Header txt={"결제하기"} />
      </div>
      <div>
        <PhotoRegister status="before" />
      </div>
    </main>
  );
}
