import { X } from "lucide-react";

interface HeaderProps {
    txt: string;
}

export default function Header({txt}: HeaderProps) {
  return (
    <div className="flex h-[60px] items-center px-4 text-gray900">
        <X className="w-6 h-6" />
        <div className="flex-1 text-center gap-2 ">
            <div className="text-xl font-semibold">{txt}</div>
        </div>
        <div className="w-6 h-6"></div>
    </div>
  );
}

