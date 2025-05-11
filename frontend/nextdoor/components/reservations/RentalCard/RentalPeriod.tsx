import { formatKoreanDate } from "@/lib/utils";

interface RentalPeriodProps {
  startDate: string;
  endDate: string;
}

export default function RentalPeriod({
  startDate,
  endDate,
}: RentalPeriodProps) {
  return (
    <div className="flex w-full border-b text-sm">
      {/* 대여일 */}
      <div className="flex items-center justify-between w-1/2 p-2 border-r whitespace-nowrap">
        <span className="text-gray700">대여일</span>
        <span className="ml-2 text-gray-900 truncate">
          {formatKoreanDate(startDate)}
        </span>
      </div>

      {/* 반납일 */}
      <div className="flex items-center justify-between w-1/2 p-2 whitespace-nowrap">
        <span className="text-gray700">반납일</span>
        <span className="ml-2 text-gray900 truncate">
          {formatKoreanDate(endDate)}
        </span>
      </div>
    </div>
  );
}
