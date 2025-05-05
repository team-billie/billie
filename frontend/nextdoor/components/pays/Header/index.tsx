import { X } from "lucide-react";

interface HeaderProps {
    type: "recharge" | "transfer",
}

export default function Header({type}: HeaderProps) {
  return (
    <div className="flex h-[60px] items-center px-4 text-gray900">
        <X className="w-6 h-6" />
        <div className="flex-1 text-center gap-2 ">
            <div className="text-xl font-semibold">{ type === "recharge" ? "충전" : "송금"}</div>
        </div>
        <div className="w-6 h-6"></div>
    </div>
  );
}

