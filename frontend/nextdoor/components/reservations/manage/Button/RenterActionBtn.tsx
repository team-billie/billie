"use client";

import dynamic from "next/dynamic";
import axiosInstance from "@/lib/api/instance";
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
  console.log("RenterActionBtn userId:", userId);
  console.log("RENTER버튼", process);

  // userId가 없으면 렌더링하지 않음
  if (!userId) {
    return null;
  }

  // 대여자 입장의 레이블 - 프로세스와 상태를 모두 고려
  const getLabel = () => {
    // 프로세스와 상태를 함께 고려하여 레이블 결정
    switch (process) {
      case RENTAL_PROCESS.BEFORE_RENTAL:
        if (status === RENTAL_STATUS.CREATED) {
          return "사진 등록 대기 중"; // Renter 버튼 - 대여 시작 등록 후 (비활성화)
        } else if (status === RENTAL_STATUS.BEFORE_PHOTO_REGISTERED) {
          return "결제"; // Renter 버튼 - 소유자가 안심 사진 등록 후
        } else if (status === RENTAL_STATUS.REMITTANCE_REQUESTED) {
          return "결제";
        }

      case RENTAL_PROCESS.RENTAL_IN_ACTIVE:
        if (status === RENTAL_STATUS.REMITTANCE_CONFIRMED) {
          return "물품 결제 완료";
        }
        return "대여 진행중";

      case RENTAL_PROCESS.RETURNED:
        if (status === RENTAL_STATUS.RENTAL_PERIOD_ENDED) {
          return "안심 사진 등록"; // Renter 버튼 - 대여 시간 끝난 후
        } else if (status === RENTAL_STATUS.DEPOSIT_REQUESTED) {
          return "보증금 처리 중"; // Renter 버튼 - 반납 사진 등록 후 또는 보증금 처리 요청됨
        }
      case RENTAL_PROCESS.RENTAL_COMPLETED:
        return "거래 완료"; // Renter 버튼 - 모든 과정 완료

      default:
        return "";
    }
  };
  const isButtonDisabled = () => {
    return !(
      (process === RENTAL_PROCESS.RETURNED &&
        status === RENTAL_STATUS.RENTAL_PERIOD_ENDED) ||
      (process === RENTAL_PROCESS.BEFORE_RENTAL &&
        status === RENTAL_STATUS.REMITTANCE_REQUESTED)
    );
  };

  const handleClick = async () => {
    if (isButtonDisabled()) return;
    //렌터 입장에서 해야할 일들
    if (
      process === RENTAL_PROCESS.RETURNED &&
      status === RENTAL_STATUS.RENTAL_PERIOD_ENDED
    ) {
      // 안심 사진 등록은 axios 요청 없이 이동만 하면 되므로, try-catch 밖에서 바로 실행
      window.location.href = `/reservations/${rentalId}/safe-deal/manage`;
      return;
    }
    try {
      //결제하기
      if (process === RENTAL_PROCESS.BEFORE_RENTAL) {
        if (status === RENTAL_STATUS.REMITTANCE_REQUESTED) {
          router.push(`/pays/payment/${rentalId}`);
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
