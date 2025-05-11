"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTestUserStore } from "@/lib/store/useTestUserStore";

export default function ReservationManageNavbar() {
  const pathname = usePathname();
  const { userId } = useTestUserStore();
  console.log("ReservationManageNavbar userId:", userId);

  const isManage = pathname?.endsWith("/manage");
  const isBorrow = pathname?.endsWith("/borrow");

  // userId가 없으면 렌더링하지 않음
  if (!userId) {
    return null;
  }

  return (
    <main>
      <div className=" navbar bg-blue400 text-primary-content flex items-center justify-between px-4 h-16">
        <Link href="/reservations">
          <ChevronLeft className="w-6 h-6 text-white" />
        </Link>
        <span className="absolute left-1/2 transform -translate-x-1/2 text-xl text-white">
          예약 관리
        </span>
        <div className="w-6 h-6" />
      </div>

      <div className="w-full flex justify-center border-b border-gray-200">
        <nav className="flex w-4/5">
          <Link
            href="/reservations/manage"
            className={`w-1/2 text-center py-3 border-b-2 font-medium text-l transition-all duration-200
              ${isManage
                ? "border-blue400"
                : "text-gray-500 hover:text-gray-700 hover:border-gray-300 border-transparent"
              }`}
          >
            예약 신청받은 물품
          </Link>
          <Link
            href="/reservations/manage/borrow"
            className={`w-1/2 text-center py-3 border-b-2 font-medium text-l transition-all duration-200
              ${isBorrow
                ? "border-blue400 "
                : "text-gray-500 hover:text-gray-700 hover:border-gray-300 border-transparent"
              }`}
          >
            예약 신청한 물품
          </Link>
        </nav>
      </div>
    </main>
  );
}
