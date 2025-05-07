import { formatKoreanDate } from "@/lib/utils";
import { MessageCircleMore } from "lucide-react";
import Image from "next/image";
import { start } from "repl";
import ReservationActionBtn from "../manage/Button/ReservationActionBtn";
import RentalPeriod from "./RentalPeriod";
import RentalContent from "./RentalContent";

interface LendCardProps {
  title: string;
  img: string;
  cost: number;
  date: number;
  startDate: string;
  endDate: string;
}
export default function LendCard({
  title,
  img,
  cost,
  date,
  startDate,
  endDate,
}: LendCardProps) {
  return (
    <div className="w-full border rounded-lg flex flex-col">
      {/* 대여기간 */}
      <RentalPeriod startDate={startDate} endDate={endDate} />

      {/* 내용 */}
      <RentalContent img={img} title={title} cost={cost} date={date} />

      {/* 상태 바 */}
      <div>안심대여중</div>
    </div>
  );
}
