import axiosInstance from "@/lib/api/instance";
import {
  RENTAL_PROCESS,
  RENTAL_STATUS,
  RentalProcess,
  RentalStatus,
} from "@/types/rental";

interface OwnerActionBtnProps {
  status: RentalStatus;
  process: RentalProcess;
  rentalId: number;
  onSuccess?: () => void;
}

export default function OwnerActionBtn({
  status,
  rentalId,
  process,
  onSuccess,
}: OwnerActionBtnProps) {
  // 소유자 입장의 레이블 - 프로세스와 상태를 모두 고려
  const getLabel = () => {
    // 프로세스와 상태를 함께 고려하여 레이블 결정
    switch (process) {
      case RENTAL_PROCESS.BEFORE_RENTAL:
        if (status === RENTAL_STATUS.BEFORE_PHOTO_REGISTERED) {
          return "결제 요청";
        } else {
          return "취소됨";
        }

      case RENTAL_PROCESS.RENTAL_IN_ACTIVE:
        if (status === RENTAL_STATUS.REMITTANCE_CONFIRMED) {
          return "물품 결제 완료";
        }
        return "대여 진행중";

      case RENTAL_PROCESS.RETURNED:
        if (status === RENTAL_STATUS.RENTAL_PERIOD_ENDED) {
          return "보증금 처리";
        } else if (status === RENTAL_STATUS.AFTER_PHOTO_REGISTERED) {
          return "보증금 처리";
        } else if (status === RENTAL_STATUS.DEPOSIT_REQUESTED) {
          return "보증금 처리";
        }
        return "보증금 처리";

      case RENTAL_PROCESS.RENTAL_COMPLETED:
        return "거래 완료";

      default:
        return "";
    }
  };

  // 버튼 활성화 여부 - 프로세스와 상태를 모두 고려
  const isButtonDisabled = () => {
    // 특정 상태에서만 버튼 활성화
    const activeStatuses = [
      RENTAL_STATUS.CREATED, // 안심 사진 등록을 위해
      RENTAL_STATUS.BEFORE_PHOTO_REGISTERED, // 결제 요청을 위해
      RENTAL_STATUS.REMITTANCE_REQUESTED, // 결제 승인을 위해
      RENTAL_STATUS.AFTER_PHOTO_REGISTERED, // 보증금 처리를 위해
    ];

    return !activeStatuses.includes(status);
  };

  // 액션 핸들러
  const handleClick = async () => {
    if (isButtonDisabled()) return;

    try {
      // 현재 상태에 따른 액션 실행
      switch (status) {
        case RENTAL_STATUS.CREATED:
          // 안심 사진 등록 페이지로 이동
          window.location.href = `/rentals/${rentalId}/safety-photo/owner`;
          break;

        case RENTAL_STATUS.BEFORE_PHOTO_REGISTERED:
          // 결제 요청 상태로 변경
          await axiosInstance.patch(`/api/v1/rentals/${rentalId}/status`, {
            status: RENTAL_STATUS.REMITTANCE_REQUESTED,
          });
          break;

        case RENTAL_STATUS.REMITTANCE_REQUESTED:
          // 결제 확인 처리
          await axiosInstance.patch(`/api/v1/rentals/${rentalId}/status`, {
            status: RENTAL_STATUS.REMITTANCE_CONFIRMED,
          });
          break;

        case RENTAL_STATUS.AFTER_PHOTO_REGISTERED:
          // 보증금 반환 요청
          await axiosInstance.patch(`/api/v1/rentals/${rentalId}/status`, {
            status: RENTAL_STATUS.DEPOSIT_REQUESTED,
          });
          break;

        default:
          console.log("No action available for current status/process");
          break;
      }

      // 성공 콜백 호출
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
