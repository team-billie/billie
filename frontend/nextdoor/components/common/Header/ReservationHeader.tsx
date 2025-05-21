// common/Header/ReservationHeader.tsx
"use client";

import { Calendar, MessageCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MainHeader({ title }: { title: string }) {
  const pathname = usePathname();
  const isReservationPage = title === "Reservations";

  const tabs = isReservationPage
    ? [
        { label: "빌리기", href: "/reservations" },
        { label: "빌려주기", href: "/reservations/lend" },
      ]
    : [
        { label: "", href: "/chat" },
        { label: "", href: "/chat" },
      ];

  return (
    <div className="w-full max-w-md mx-auto h-full bg-bluegradient pb-12">
      <div className="flex p-5 gap-2 text-3xl font-bold text-white items-center">
        {isReservationPage ? (
          <>
            <Calendar />
            <div>{title}</div>
          </>
        ) : (
          <>
            <MessageCircle />
            <div>{title}</div>
          </>
        )}
      </div>
      <div className="w-full flex justify-center">
        <nav className="flex w-3/4 mb-2 text-lg">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`w-1/2 text-center py-3 border-b-2 font-medium text-l transition-all duration-200 ${
                  isActive
                    ? "border-white text-white font-bold"
                    : "text-blue100 hover:text-white hover:border-gray-300 border-transparent"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
