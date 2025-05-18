"use client";

import dynamic from "next/dynamic";
import useUserStore from "@/lib/store/useUserStore";
import {
  RENTAL_PROCESS,
  RENTAL_STATUS,
  RentalProcess,
  RentalStatus,
} from "@/types/rental";
import { useRouter } from "next/navigation";

interface RenterActionBtnProps {
  status: RentalStatus;
  process: RentalProcess;
  rentalId: number;
  onSuccess?: () => void;
}

function RenterActionBtn({
  status,
  rentalId,
  process,
  onSuccess,
}: RenterActionBtnProps) {
  const { userId } = useUserStore();
  const router = useRouter();

  // userId가 없으면 렌더링하지 않음
  if (!userId) {
    return null;
  }

  // RENTER 입장의 레이블
  const getLabel = () => {
    switch (process) {
      case RENTAL_PROCESS.BEFORE_RENTAL:
        return "안심 결제";

      case RENTAL_PROCESS.RENTAL_IN_ACTIVE:
        return "물품 결제 완료";

      case RENTAL_PROCESS.RETURNED:
        return "반납 중";

      case RENTAL_PROCESS.RENTAL_COMPLETED:
        return "거래 완료";

      default:
        return "";
    }
  };
  const isButtonDisabled = () => {
    return !(
      (process === RENTAL_PROCESS.BEFORE_RENTAL &&
        status === RENTAL_STATUS.REMITTANCE_REQUESTED) ||
      (process === RENTAL_PROCESS.BEFORE_RENTAL &&
        status === RENTAL_STATUS.BEFORE_PHOTO_ANALYZED)
    );
  };

  const handleClick = async () => {
    if (isButtonDisabled()) return;
    //렌터 입장에서 해야할 일들

    try {
      //결제하기
      if (process === RENTAL_PROCESS.BEFORE_RENTAL) {
        if (status === RENTAL_STATUS.REMITTANCE_REQUESTED) {
          router.push(`/safe-deal/${rentalId}/before/photos-register`);
          return;
        } else if (status === RENTAL_STATUS.BEFORE_PHOTO_ANALYZED) {
          router.push(`/safe-deal/${rentalId}/before/payment`);
          return;
        }
      }

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("요청 처리 실패:", error);
      alert("요청 처리 중 문제가 발생했습니다.");
    }
  };

  const disabled = isButtonDisabled();
  const label = getLabel();
  return (
    <div
      className={disabled ? "action-btn-disabled" : "action-btn-enabled"}
      onClick={disabled ? undefined : handleClick}
    >
      {label}
    </div>
  );
}

// dynamic import로 컴포넌트를 감싸서 클라이언트 사이드에서만 렌더링되도록 설정
export default dynamic(() => Promise.resolve(RenterActionBtn), {
  ssr: false,
});
