import { DollarSign, Heart, Calendar, BookOpen, CalendarCheck } from "lucide-react";

type HeaderType = keyof typeof HEADER_DATA;

interface LinkHeaderProps {
  type: HeaderType;
}

const HEADER_DATA = {
  account: {
    icon: DollarSign,
    label: "계좌관리",
  },
  like: {
    icon: Heart,
    label: "관심물품",
  },
  reservation: {
    icon: Calendar,
    label: "예약관리",
  },
  apply: {
    icon: CalendarCheck,
    label: "요청관리",
  },
  history: {
    icon: BookOpen,
    label: "빌리내역",
  },
} as const;


export default function LinkHeader({ type }: LinkHeaderProps) {
  const { icon: Icon, label } = HEADER_DATA[type];

  return (
    <div className="flex items-center gap-2">
      <div className="flex justify-center items-center bg-blue200 bg-opacity-40 w-8 h-8 rounded-lg">
        <Icon className="text-blue300 w-5" />
      </div>
      <span className="text-gray-700 font-medium">{label}</span>
    </div>
  )
}
