"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, X } from "lucide-react";

interface HeaderProps {
  txt: string;
}

export default function Header({ txt }: HeaderProps) {
  const router = useRouter();

  return (
    <div className="sticky top-0 flex min-h-[60px] items-center px-4 text-white bg-black">
      <button onClick={() => router.back()}>
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <div className="flex-1 text-center gap-2 ">
        <div className="text-xl font-semibold">{txt}</div>
      </div>
      <div className="w-6 h-6"></div>
    </div>
  );
}
