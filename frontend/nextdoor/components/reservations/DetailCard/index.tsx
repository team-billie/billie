import { useParams, usePathname, useRouter } from "next/navigation";
import useUserStore from "@/lib/store/useUserStore";
import RentalPeriod from "../RentalCard/RentalPeriod";
import RentalContent from "../RentalCard/RentalContent";
import DetailContent from "./DetailContent";

interface DetailCardProps {
  title: string;
  img: string[];
  cost: number;
  date: number;
  startDate: string;
  endDate: string;
  deposit: number;
}

export default function DetailCard({
  title,
  img,
  cost,
  date,
  startDate,
  endDate,
  deposit,
}: DetailCardProps) {
  const { userId } = useUserStore();
  // userId가 없으면 렌더링하지 않음
  if (!userId) {
    return null;
  }
  const totalCost = cost * date;
  return (
    <div className="w-full border rounded-lg flex flex-col">
      {/* 대여기간 */}
      <RentalPeriod startDate={startDate} endDate={endDate} />

      <div className="relative">
        {/* 내용 */}
        <DetailContent
          deposit={deposit}
          img={img[0]}
          title={title}
          cost={totalCost}
          date={date}
        />
      </div>
    </div>
  );
}
