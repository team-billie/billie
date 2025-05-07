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
    <div className="flex w-full border-b ">
      <div className="flex justify-between w-1/2 p-3 border-r">
        <div className="text-gray-500">대여일</div>
        <div>{formatKoreanDate(startDate)}</div>
      </div>

      <div className="flex justify-between w-1/2  p-3">
        <div className="text-gray-500">반납일</div>
        <div>{formatKoreanDate(endDate)}</div>
      </div>
    </div>
  );
}
