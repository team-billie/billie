"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

interface HeaderProps {
  txt: string;
  x?: boolean;
  color?: string;
}

export default function Header({ txt, x = true, color = "bg-white text-gray900" }: HeaderProps) {
  const router = useRouter();

  return (
    <div className={`sticky top-0 flex min-h-[60px] items-center px-4 ${color}`}>
        <button onClick={() => router.back()}>
          {x && <ChevronLeft className="w-6 h-6" />}
        </button>
        <div className="flex-1 text-center gap-2 ">
            <div className="text-xl font-semibold">{txt}</div>
        </div>
        <div className="w-6 h-6"></div>
    </div>
  );
}
