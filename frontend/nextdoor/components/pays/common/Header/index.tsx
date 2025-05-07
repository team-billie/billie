import { X } from "lucide-react";

interface HeaderProps {
    txt: string;
    x?: boolean;
}

export default function Header({txt, x = true}: HeaderProps) {
  return (
    <div className="sticky top-0 flex h-[60px] items-center px-4 text-gray900 bg-white">
        {x && <X className="w-6 h-6" />}
        <div className="flex-1 text-center gap-2 ">
            <div className="text-xl font-semibold">{txt}</div>
        </div>
        <div className="w-6 h-6"></div>
    </div>
  );
}

