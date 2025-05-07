import RentalPeriod from "./RentalPeriod";
import RentalContent from "./RentalContent";
import TimelineBar from "./TimelineBar";

interface OwnerCardProps {
  title: string;
  img: string;
  cost: number;
  date: number;
  startDate: string;
  endDate: string;
}
export default function OwnerCard({
  title,
  img,
  cost,
  date,
  startDate,
  endDate,
}: OwnerCardProps) {
  return (
    <div className="w-full border rounded-lg flex flex-col">
      {/* 대여기간 */}
      <RentalPeriod startDate={startDate} endDate={endDate} />

      {/* 내용 */}
      <RentalContent img={img} title={title} cost={cost} date={date} />

      {/* 상태 바 */}
      {/* 1 ~ 4 단계 */}
      <TimelineBar currentStep={3} />
    </div>
  );
}
