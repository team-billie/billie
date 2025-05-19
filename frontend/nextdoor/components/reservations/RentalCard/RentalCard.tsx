import RentalPeriod from "./RentalPeriod";
import RentalContent from "./RentalContent";
import TimelineBar from "./TimelineBar";
import RentalDetailBtn from "../manage/Button/RentalDetailBtn";
import OwnerActionBtn from "../manage/Button/OwnerActionBtn";
import RenterActionBtn from "../manage/Button/RenterActionBtn";
import { RentalProcess, RentalStatus, UserType } from "@/types/rental";
import { useParams, usePathname, useRouter } from "next/navigation";
import SafeDealBtn from "../manage/Button/SafeDealBtn";
import useUserStore from "@/lib/store/useUserStore";
import { MessageCircleMore } from "lucide-react";

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
  const router = useRouter();
  const { id } = useParams();
  // userId가 없으면 렌더링하지 않음
  if (!userId) {
    return null;
  }
  const totalCost = cost * date;
  return (
    <div className="w-full border rounded-lg flex flex-col mb-30">
      {/* 대여기간 */}
      <RentalPeriod startDate={startDate} endDate={endDate} />

      <div className="relative">
        {/* 내용 */}
        <RentalContent
          deposit={deposit}
          img={img}
          title={title}
          cost={totalCost}
          date={date}
        />

        {/* AI 안심거래 버튼 */}
        {(pathname === "/reservations" ||
          pathname === "/reservations/lend") && (
          <div className="absolute top-3 right-4 ">
            <SafeDealBtn reservationId={rentalId} />
          </div>
        )}
      </div>

      {/* 상태 바 */}
      {/* 1 ~ 4 단계 */}
      <TimelineBar currentStep={process} />

      {/* 버튼들 */}
      <div className="flex divide-x border rounded-md overflow-hidden text-center text-sm">
        <RentalDetailBtn
          onClick={() => router.push(`/reservations/${rentalId}`)}
        />

        {/* 사용자 타입에 따라 다른 버튼 컴포넌트 렌더링 */}
        {userType === "OWNER" ? (
          <OwnerActionBtn
            charge={cost * date}
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
        <div className="w-12 py-2 hover:bg-gray-100 cursor-pointer flex text-gray600 justify-center items-center">
          <MessageCircleMore />
        </div>
      </div>
    </div>
  );
}
