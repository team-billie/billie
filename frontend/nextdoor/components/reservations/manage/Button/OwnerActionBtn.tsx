"use client";
import axiosInstance from "@/lib/api/instance";
import useUserStore from "@/lib/store/useUserStore";
import {
  RENTAL_PROCESS,
  RENTAL_STATUS,
  RentalProcess,
  RentalStatus,
} from "@/types/rental";
import { useState } from "react";
import PaymentApplyModal from "@/components/pays/modals/PaymentApplyModal";
import HandleDepositModal from "@/components/pays/modals/HandleDepositModal";

interface OwnerActionBtnProps {
  status: RentalStatus;
  process: RentalProcess;
  rentalId: number;
  charge: number;
  renterId: number;
  deposit: number;
  onSuccess?: () => void;
}

export default function OwnerActionBtn({
  status,
  rentalId,
  process,
  charge,
  renterId,
  deposit,
  onSuccess,
}: OwnerActionBtnProps) {
  const { userId } = useUserStore();
  const [isModal, setModal] = useState(false);
  const [isDepositModal, setIsDepositModal] = useState(false);
  console.log("OwnerActionBtn userId:", userId);
  console.log("OWner버튼", process);
  // userId가 없으면 렌더링하지 않음
  if (!userId) {
    return null;
  }

  // 소유자 입장의 레이블 - 프로세스와 상태를 모두 고려
  const getLabel = () => {
    // 프로세스와 상태를 함께 고려하여 레이블 결정
    switch (process) {
      case RENTAL_PROCESS.BEFORE_RENTAL:
        if (status === RENTAL_STATUS.CREATED) {
          return "안심 사진 등록";
        } else if (status === RENTAL_STATUS.BEFORE_PHOTO_REGISTERED) {
          return "결제 요청";
        } else if (status === RENTAL_STATUS.REMITTANCE_REQUESTED) {
          return "결제 대기 중";
        }

      case RENTAL_PROCESS.RENTAL_IN_ACTIVE:
        if (status === RENTAL_STATUS.REMITTANCE_CONFIRMED) {
          return "물품 결제 완료";
        }
        return "대여 진행중";

      case RENTAL_PROCESS.RETURNED:
        //대여 기간이 끝남
        if (status === RENTAL_STATUS.RENTAL_PERIOD_ENDED) {
          return "사진 등록 대기중";
          //안심 사진 등록이 끝나서 보증금 처리 가능 상태
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
    switch (process) {
      case RENTAL_PROCESS.BEFORE_RENTAL:
        return !(
          status === RENTAL_STATUS.CREATED ||
          status === RENTAL_STATUS.BEFORE_PHOTO_REGISTERED
        );

      case RENTAL_PROCESS.RENTAL_IN_ACTIVE:
        return !(status === RENTAL_STATUS.REMITTANCE_REQUESTED);

      case RENTAL_PROCESS.RETURNED:
        return status !== RENTAL_STATUS.DEPOSIT_REQUESTED;

      default:
        return true;
    }
  };

  const handleClick = async () => {
    if (isButtonDisabled()) return;

    if (
      process === RENTAL_PROCESS.BEFORE_RENTAL &&
      status === RENTAL_STATUS.CREATED
    ) {
      // 안심 사진 등록은 axios 요청 없이 이동만 하면 되므로, try-catch 밖에서 바로 실행
      window.location.href = `/reservations/${rentalId}/safe-deal/manage`;
      return;
    }

    try {
      if (process === RENTAL_PROCESS.BEFORE_RENTAL) {
        //결제 요청
        if (status === RENTAL_STATUS.BEFORE_PHOTO_REGISTERED) {
          setModal(true);
          return;
        } //물품 결제 완료
      } else if (process === RENTAL_PROCESS.RENTAL_IN_ACTIVE) {
        if (status === RENTAL_STATUS.REMITTANCE_CONFIRMED) {
          await axiosInstance.patch(`/api/v1/rentals/${rentalId}/status`, {
            status: RENTAL_STATUS.REMITTANCE_CONFIRMED,
            userId: userId,
          });
        } //보증금 처리
      } else if (process === RENTAL_PROCESS.RETURNED) {
        if (status === RENTAL_STATUS.DEPOSIT_REQUESTED) {
          setIsDepositModal(true);
          console.log("보증금 처리");
          alert("보증금 처리");
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
    <>
      <div
        className={disabled ? "action-btn-disabled" : "action-btn-enabled"}
        onClick={disabled ? undefined : handleClick}
      >
        {label}
      </div>
      {isModal && (
        <PaymentApplyModal
          charge={charge}
          rentalId={rentalId.toString()}
          setIsModalOpen={setModal}
        />
      )}
      {isDepositModal && (
        <HandleDepositModal
          charge={deposit}
          rentalImg=""
          rentalId={rentalId}
          renterId={renterId}
          setIsModalOpen={setIsDepositModal}
        />
      )}
    </>
  );
}
