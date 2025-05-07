"use client";

import { X } from "lucide-react";
import Link from "next/link";

export default function ProductRegisterHeader() {
  return (
    <main>
      <div className="navbar bg-blue400 text-primary-content flex items-center justify-between px-4 h-16">
        <Link href="/home">
          <X className="w-6 h-6 text-white" />
        </Link>
        <span className="absolute left-1/2 transform -translate-x-1/2 text-xl text-white">
          내 물건 빌려주기
        </span>
        <div className="w-6 h-6" />
      </div>
    </main>
  );
}
