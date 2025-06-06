"use client";

import LinkHeader from "@/components/(tabs)/profile/LinkHeader";
import PayBox from "@/components/(tabs)/profile/PayBox";
import useUserStore from "@/lib/store/useUserStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
  const { username, userKey, userId, reset } = useUserStore();
  const router = useRouter();

  const handleLogout = () => {
    reset();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userKey");
    router.push("/login");
  }

  return (
    <div className="flex flex-col min-h-[100dvh] pb-20">
      <div className="flex-1 flex flex-col bg-blue300 p-4">
        <div className="flex-1 flex flex-col pt-8 text-white font-bold text-2xl px-2">
          <span>안녕하세요</span>
          <span>{username || "사용자"} 님!</span>
        </div>

        <PayBox type="profile" />
      </div>

      <div className="flex flex-col gap-4 bg-gray100 text-gray-700 p-4">
        <Link href="/posts/liked" className="bg-white shadow-popup p-4 rounded-2xl">
          <LinkHeader type="like" />
        </Link>

        <div className="grid grid-cols-2 gap-4">
          <Link href="/reservations" className="bg-white shadow-popup p-4 rounded-2xl">
            <LinkHeader type="reservation" />
            <div className="flex justify-end items-end font-bold px-2 mt-1 text-gray900">
              <span className="text-4xl">4</span>
              <span className="text-lg">건</span>
            </div>
            <div className="mt-3 text-center text-gray500 text-sm">
              현재 에약중인 물품수
            </div>
          </Link>

          <Link href="/reservations/manage" className="bg-white shadow-popup p-4 rounded-2xl">
            <LinkHeader type="apply" />
            <div className="flex justify-end items-end font-bold px-2 mt-1 text-gray900">
              <span className="text-4xl">4</span>
              <span className="text-lg">건</span>
            </div>
            <div className="mt-3 text-center text-gray500 text-sm">
              예약 요청받은 물품수
            </div>
          </Link>
        </div>

        <div className="flex justify-end">
          <div
            onClick={handleLogout}
            className="text-center text-white text-lg bg-gray900 shadow-popup py-2 px-14 rounded-2xl"
          >
            logout
          </div>
        </div>
      </div>
    </div>
  );
}