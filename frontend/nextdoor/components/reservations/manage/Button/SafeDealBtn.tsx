import Image from "next/image";
import blueStar from "@/public/images/blueStar.png";
import Link from "next/link";
import useUserStore from "@/lib/store/useUserStore";
interface SafeDealBtnProps {
  reservationId: number;
}

export default function SafeDealBtn({ reservationId }: SafeDealBtnProps) {
  const { userId } = useUserStore();

  // userId가 없으면 렌더링하지 않음
  if (!userId) {
    return null;
  }

  return (
    <div className="relative inline-block">
      <Link href={`/safe-deal/${reservationId}/result`}>
        <div className="bg-blue400 p-1.5 rounded-xl text-white px-3.5 font-semibold text-sm whitespace-nowrap">
          AI 안심거래
        </div>
      </Link>
      <Image
        src={blueStar}
        width={24}
        height={24}
        alt="안심 아이콘"
        className="absolute -top-2 -right-3"
      />
    </div>
  );
}
