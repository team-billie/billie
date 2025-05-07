import { formatKoreanDate } from "@/lib/utils";
import { MessageCircleMore } from "lucide-react";
import Image from "next/image";
import { start } from "repl";
import ReservationActionBtn from "../manage/Button/ReservationActionBtn";
import RentalPeriod from "./RentalPeriod";
import RentalContent from "./RentalContent";

interface LendManageCardProps {
  title: string;
  img: string;
  cost: number;
  date: number;
  startDate: string;
  endDate: string;
}
export default function BorrowManageCard({
  title,
  img,
  cost,
  date,
  startDate,
  endDate,
}: LendManageCardProps) {
  return (
    <div className="w-full border rounded-lg flex flex-col">
      {/* 대여기간 */}
      <RentalPeriod startDate={startDate} endDate={endDate} />

      {/* 내용 */}
      <RentalContent img={img} title={title} cost={cost} date={date} />

      {/* 버튼들 */}
      <div className="flex divide-x border rounded-md overflow-hidden text-center text-sm">
        <ReservationActionBtn status={"cancel"} reservationId={1} />

        <div className="w-12 py-2 hover:bg-gray-100 cursor-pointer flex text-gray600 justify-center items-center">
          <MessageCircleMore />
        </div>
      </div>
    </div>
  );
}
