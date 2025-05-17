"use client";

import Header from "@/components/safe-deal/Header";
import PhotoRegister from "@/components/safe-deal/PhotoRegister";

export default function SafeDealAfter() {
  return (
    <main className="fixed inset-0 w-full h-full bg-graygradient flex flex-col">
      <div className="fixed top-0 left-0 w-full z-10 bg-graygradient">
        <Header txt={"반납하기"} />
      </div>
      <div className="flex-1 overflow-y-auto">
        <PhotoRegister status={"after"} />
      </div>
    </main>
  );
}
