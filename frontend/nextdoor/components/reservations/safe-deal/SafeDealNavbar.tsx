"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function SafeDealNavbar() {
  const pathname = usePathname();
  const isManage = pathname?.endsWith("/manage");
  const isResult = pathname?.endsWith("/result");
  const { id } = useParams();
  return (
    <main>
      <div className="navbar bg-blue400 text-primary-content flex items-center justify-between px-4 h-16">
        <Link href="/home">
          <ChevronLeft className="w-6 h-6 text-white" />
        </Link>
        <span className="absolute left-1/2 transform -translate-x-1/2 text-xl text-white">
          AI 안심거래
        </span>
        <div className="w-6 h-6" />
      </div>

      <div className="w-full flex justify-center border-b border-gray-200">
        <nav className="flex w-3/4">
          <Link
            href={`/reservations/${id}/safe-deal/manage`}
            className={`w-1/2 text-center py-3 border-b-2 font-medium text-l transition-all duration-200
              ${
                isManage
                  ? "border-blue400"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300 border-transparent"
              }`}
          >
            물품 사진 관리
          </Link>
          <Link
            href={`/reservations/${id}/safe-deal/result`}
            className={`w-1/2 text-center py-3 border-b-2 font-medium text-l transition-all duration-200
              ${
                isResult
                  ? "border-blue400 "
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300 border-transparent"
              }`}
          >
            AI 분석 결과
          </Link>
        </nav>
      </div>
    </main>
  );
}
