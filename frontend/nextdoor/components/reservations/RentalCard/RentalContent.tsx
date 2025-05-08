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
    <div className="flex items-center justify-between gap-4 p-4 mt-2">
      {/* 썸네일 이미지 */}
      <div className="w-20 h-20 relative flex-shrink-0 rounded-md overflow-hidden">
        <Image src={img} alt={title} fill className="object-cover" />
      </div>

      {/* 텍스트 영역 */}
      <div className="flex flex-col justify-between flex-grow overflow-hidden">
        <div className="truncate">
          <div className="text-m  truncate">{title}</div>
          <div className="whitespace-nowrap text-ellipsis overflow-hidden">
            <span className="text-l text-gray900 font-semibold">
              {cost.toLocaleString()}원
            </span>
            <span className="text-gray700"> /</span>
            <span className="text-gray700 font-semibold"> {date}</span>
            <span className="text-gray700">일</span>
          </div>
        </div>
      </div>

      {/* AI 안심거래 버튼
      {(pathname === "/reservations" || pathname === "/reservations/lend") && (
        <div className="flex-shrink-0 ml-2">
          <SafeDealBtn reservationId={1} />
        </div>
      )} */}
    </div>
  );
}
