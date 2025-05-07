import RentalPeriod from "./RentalPeriod";
import RentalContent from "./RentalContent";
import TimelineBar from "./TimelineBar";
import ReservationActionBtn from "../manage/Button/ReservationActionBtn";
import RentalDetailBtn from "../manage/Button/RentalDetailBtn";

interface RenterCardProps {
  title: string;
  img: string;
  cost: number;
  date: number;
  startDate: string;
  endDate: string;
}
export default function RenterCard({
  title,
  img,
  cost,
  date,
  startDate,
  endDate,
}: RenterCardProps) {
  return (
    <div className="w-full border rounded-lg flex flex-col">
      {/* 대여기간 */}
      <RentalPeriod startDate={startDate} endDate={endDate} />

      {/* 내용 */}
      <RentalContent img={img} title={title} cost={cost} date={date} />

      {/* 상태 바 */}
      {/* 1 ~ 4 단계 */}
      <TimelineBar currentStep={3} />

      {/* 버튼들 */}
      <div className="flex divide-x border rounded-md overflow-hidden text-center text-sm">
        <RentalDetailBtn />
        <ReservationActionBtn status={"cancel"} rentalId={1} />
      </div>
    </div>
  );
}
