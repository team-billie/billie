"use client";

import { Calendar, House, MessageCircle, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MainDock() {
  const pathname = usePathname();

  const tabs = [
    {
      key: "home",
      label: "홈",
      href: "/home",
      icon: <House className="w-6 h-6" />,
    },
    {
      key: "reservations",
      label: "예약",
      href: "/reservations",
      icon: <Calendar className="w-6 h-6" />,
    },
    {
      key: "chat",
      label: "채팅",
      href: "/chat/borrow",
      icon: <MessageCircle className="w-6 h-6" />,
    },
    {
      key: "profile",
      label: "내정보",
      href: "/profile",
      icon: <User className="w-6 h-6" />,
    },
  ];

  return (
    <div className="fixed bottom-0 w-full max-w-md mx-auto bg-white border-t shadow-lg rounded-t-3xl">
      <div className="flex justify-around items-center py-4 ">
        {tabs.map((tab) => {
          const isActive = pathname.startsWith(tab.href);
          return (
            <Link key={tab.key} href={tab.href}>
              <div
                className={`relative flex flex-col items-center ${
                  isActive
                    ? "text-blue400 font-semibold"
                    : "text-gray600 hover:text-blue400"
                } transition-colors`}
              >
                {tab.icon}
                <span className="text-xs mt-1">{tab.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
