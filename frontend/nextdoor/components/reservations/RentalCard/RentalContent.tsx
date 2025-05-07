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
    <div className="flex gap-4 px-4 pt-4">
      <div className="w-24 h-24 relative flex-shrink-0 rounded-md overflow-hidden">
        <Image src={img} alt={title} fill className="object-cover" />
      </div>
      <div className="flex flex-col justify-between flex-grow">
        <div>
          <div className="text-m  pt-3 ">{title}</div>
          <span className="text-xl text-gray900 font-semibold ">
            {cost.toLocaleString()} won
          </span>
          <span className=" text-gray700 "> /</span>
          <span className=" text-gray700 font-semibold"> {date}</span>
          <span className=" text-gray700 ">일</span>
        </div>
      </div>
    </div>
  );
}
