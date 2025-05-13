import RentalPeriod from "./RentalPeriod";
import RentalContent from "./RentalContent";
import TimelineBar from "./TimelineBar";
import RentalDetailBtn from "../manage/Button/RentalDetailBtn";
import OwnerActionBtn from "../manage/Button/OwnerActionBtn";
import RenterActionBtn from "../manage/Button/RenterActionBtn";
import { RentalProcess, RentalStatus, UserType } from "@/types/rental";
import { usePathname } from "next/navigation";
import SafeDealBtn from "../manage/Button/SafeDealBtn";
import useUserStore from "@/lib/store/useUserStore";

interface RentalCardProps {
  title: string;
  img: string;
  cost: number;
  date: number;
  startDate: string;
  endDate: string;
  status: RentalStatus;
  process: RentalProcess;
  userType: UserType;
  rentalId: number;
  renterId: number;
  deposit: number;
  onActionSuccess?: () => void;
}

export default function RentalCard({
  title,
  img,
  cost,
  date,
  startDate,
  endDate,
  status,
  process,
  userType,
  rentalId,
  renterId,
  deposit,
  onActionSuccess,
}: RentalCardProps) {
  const pathname = usePathname();
  const { userId } = useUserStore();
  console.log("RentalCard userId:", userId);

  // userId가 없으면 렌더링하지 않음
  if (!userId) {
    return null;
  }

  return (
    <div className="w-full border rounded-lg flex flex-col">
      {/* 대여기간 */}
      <RentalPeriod startDate={startDate} endDate={endDate} />

      <div className="relative">
        {/* 내용 */}
        <RentalContent img={img} title={title} cost={cost} date={date} />

        {/* AI 안심거래 버튼 */}
        {(pathname === "/reservations" ||
          pathname === "/reservations/lend") && (
          <div className="absolute top-3 right-4 z-10">
            <SafeDealBtn reservationId={rentalId} />
          </div>
        )}
      </div>

      {/* 상태 바 */}
      {/* 1 ~ 4 단계 */}
      <TimelineBar currentStep={process} />

      {/* 버튼들 */}
      <div className="flex divide-x border rounded-md overflow-hidden text-center text-sm">
        <RentalDetailBtn />
        {/* 사용자 타입에 따라 다른 버튼 컴포넌트 렌더링 */}
        {userType === "OWNER" ? (
          <OwnerActionBtn
            charge={cost}
            status={status}
            process={process}
            rentalId={rentalId}
            onSuccess={onActionSuccess}
            renterId={renterId}
            deposit={deposit}
          />
        ) : (
          <RenterActionBtn
            status={status}
            process={process}
            rentalId={rentalId}
            onSuccess={onActionSuccess}
          />
        )}
      </div>
    </div>
  );
}
