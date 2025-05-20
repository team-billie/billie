"use client";

import Header from "@/components/safe-deal/Header";
import PhotoRegister from "@/components/safe-deal/PhotoRegister";

export default function SafeDealAfter() {
  return (
    <main className=" max-w-screen-sm mx-auto fixed inset-0  h-full bg-graygradient flex flex-col overflow-hidden">
      <div className="z-10">
        <Header txt="반납하기" />
      </div>
      <div className="flex-1 overflow-y-auto">
        <PhotoRegister status={"after"} />
      </div>
    </main>
  );
}
