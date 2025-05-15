import { MessageCircleMore } from "lucide-react";
import ReservationActionBtn from "../manage/Button/ReservationActionBtn";
import RentalPeriod from "./RentalPeriod";
import RentalContent from "./RentalContent";

interface LendManageCardProps {
  postTitle: string;
  id: number;
  img: string;
  cost: number;
  deposit: number;
  date: number;
  startDate: string;
  endDate: string;
  onReload: () => void;
}
export default function LendManageCard({
  postTitle,
  id,
  img,
  cost,
  deposit,
  date,
  startDate,
  endDate,
  onReload,
}: LendManageCardProps) {
  return (
    <div className="w-full border rounded-lg flex flex-col">
      {/* 대여기간 */}
      <RentalPeriod startDate={startDate} endDate={endDate} />

      {/* 내용 */}
      <RentalContent
        deposit={deposit}
        img={img}
        title={postTitle}
        cost={cost}
        date={date}
      />

      {/* 버튼들 */}
      <div className="flex divide-x border rounded-md overflow-hidden text-center text-sm">
        <ReservationActionBtn
          status={"update"}
          reservationId={id}
          onSuccess={onReload}
        />
        <ReservationActionBtn
          status={"confirm"}
          reservationId={id}
          onSuccess={onReload}
        />
        <ReservationActionBtn
          status={"cancel"}
          reservationId={id}
          onSuccess={onReload}
        />

        <div className="w-12 py-2 hover:bg-gray-100 cursor-pointer flex text-gray600 justify-center items-center">
          <MessageCircleMore />
        </div>
      </div>
    </div>
  );
}
