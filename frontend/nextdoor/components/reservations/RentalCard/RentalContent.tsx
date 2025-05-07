import Image from "next/image";
import SafeDealBtn from "../manage/Button/SafeDealBtn";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  return (
    <div className="flex gap-4 p-4">
      <div className="w-20 h-20 relative flex-shrink-0 rounded-md overflow-hidden">
        <Image src={img} alt={title} fill className="object-cover" />
      </div>
      {/* 내용 */}
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

      {/* 안심 거래 버튼 */}
      {(pathname === "/reservations" || pathname === "/reservations/lend") && (
        <SafeDealBtn reservationId={1} />
      )}
    </div>
  );
}
