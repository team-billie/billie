import { formatKoreanDate } from "@/lib/utils/";
import Image from "next/image";

interface RentalPeriodProps {
  img: string;
  title: string;
  cost: number;
  date: number;
}

export default function RentalContent({
  img,
  title,
  cost,
  date,
}: RentalPeriodProps) {
  return (
    <div className="flex gap-4 p-4">
      <div className="w-24 h-24 relative flex-shrink-0 rounded-md overflow-hidden">
        <Image src={img} alt={title} fill className="object-cover" />
      </div>
      <div className="flex flex-col justify-between flex-grow">
        <div>
          <div className="text-lg font-semibold">{title}</div>
          <div className="text-sm text-gray-600">
            {cost.toLocaleString()} won / {date}일
          </div>
        </div>
      </div>
    </div>
  );
}
