import Image from "next/image";
import { usePathname } from "next/navigation";

interface DetailContentProps {
  img: string;
  title: string;
  cost: number;
  deposit: number;
  date: number;
}

export default function DetailContent({
  img,
  title,
  cost,
  date,
  deposit,
}: DetailContentProps) {
  return (
    <div className="flex items-center justify-between gap-4 p-4 my-5">
      {/* 썸네일 이미지 */}
      <div className="w-20 h-20 relative flex-shrink-0 rounded-md overflow-hidden">
        <Image src={img} alt={title} fill className="object-cover" />
      </div>

      {/* 텍스트 영역 */}
      <div className="flex flex-col justify-between flex-grow overflow-hidden ">
        <div className="truncate">
          <div className="text-m  truncate">{title}</div>
          <div className="whitespace-nowrap text-ellipsis overflow-hidden">
            <span className="text-gray700">대여료 </span>
            <span className="text-l text-gray900 font-semibold">
              {cost.toLocaleString()}원
            </span>

            <span className="text-gray700 font-semibold">({date}</span>
            <span className="text-gray700">일)</span>
          </div>
          <div>
            <span className="text-gray700">보증금 </span>
            <span className="text-l text-gray900 font-semibold">
              {deposit.toLocaleString()}원
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
