"use client";

import Header from "@/components/safe-deal/Header";
import PhotoRegister from "@/components/safe-deal/PhotoRegister";

export default function SafeDealBefore() {
  return (
    <main className="relative min-h-[100dvh] bg-graygradient">
      {/* Header 고정 */}
      <div className="fixed top-0 left-0 w-full z-10 bg-graygradient">
        <Header txt={"결제하기"} />
      </div>
      {/* Header 높이만큼 padding-top 추가 */}
      <div className="pt-[64px]">
        <PhotoRegister status="before" />
      </div>
    </main>
  );
}
