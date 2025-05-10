import { useTestUserStore } from "@/lib/store/useTestUserStore";

interface SafeDealBtnProps {
  reservationId: number;
}

export default function SafeDealBtn({ reservationId }: SafeDealBtnProps) {
  const { userId } = useTestUserStore();
  console.log("SafeDealBtn userId:", userId);

  // userId가 없으면 렌더링하지 않음
  if (!userId) {
    return null;
  }

  const handleClick = () => {
    window.location.href = `/reservations/${reservationId}/safe-deal/manage`;
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-600"
    >
      AI 안심거래
    </button>
  );
}
