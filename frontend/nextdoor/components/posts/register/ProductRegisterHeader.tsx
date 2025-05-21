"use client";

import { X } from "lucide-react";
import Link from "next/link";

export default function ProductRegisterHeader() {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-white via-blue-50/30 to-white backdrop-blur-sm border-b border-blue-100/50">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between px-4 h-16">
          <Link 
            href="/home"
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-blue-50/80 active:bg-blue-100/80 transition-all"
          >
            <X className="w-5 h-5 text-blue-500" />
          </Link>
          <div className="flex flex-col items-center">
            <h1 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              내 물건 빌려주기
            </h1>
            <p className="text-xs text-blue-500/70 mt-0.5 font-medium">
              새로운 물건을 등록해보세요
            </p>
          </div>
          <div className="w-10" />
        </div>
      </div>
    </header>
  );
}
