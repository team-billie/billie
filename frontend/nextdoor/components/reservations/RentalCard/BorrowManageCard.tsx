import { MessageCircleMore } from "lucide-react";
import ReservationActionBtn from "../manage/Button/ReservationActionBtn";
import RentalPeriod from "./RentalPeriod";
import RentalContent from "./RentalContent";

interface LendManageCardProps {
  id: number;
  postTitle: string;
  img: string;
  cost: number;
  date: number;
  startDate: string;
  deposit: number;
  endDate: string;
  onReload: () => void;
}
export default function BorrowManageCard({
  id,
  postTitle,
  img,
  cost,
  date,
  startDate,
  endDate,
  deposit,
  onReload,
}: LendManageCardProps) {
  return (
    <div className="w-full border rounded-lg flex flex-col">
      {/* 대여기간 */}
      <RentalPeriod startDate={startDate} endDate={endDate} />

      {/* 내용 */}
      <RentalContent
        img={img}
        title={postTitle}
        cost={cost}
        deposit={deposit}
        date={date}
      />

      {/* 버튼들 */}
      <div className="flex divide-x border rounded-md overflow-hidden text-center text-sm">
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
