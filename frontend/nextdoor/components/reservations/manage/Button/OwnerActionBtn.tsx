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
import { useParams, useRouter } from "next/navigation";

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
  const router = useRouter();
  // userId가 없으면 렌더링하지 않음
  if (!userId) {
    return null;
  }

  // OWNER 입장의 레이블
  const getLabel = () => {
    switch (process) {
      case RENTAL_PROCESS.BEFORE_RENTAL:
        return "안심 결제 요청";

      case RENTAL_PROCESS.RENTAL_IN_ACTIVE:
        return "물품 결제 완료";

      case RENTAL_PROCESS.RETURNED:
        return "안심 반납 처리";

      case RENTAL_PROCESS.RENTAL_COMPLETED:
        return "거래 완료";

      default:
        return "";
    }
  };

  // 버튼 활성화 여부 - 프로세스와 상태를 모두 고려
  const isButtonDisabled = () => {
    return !(
      (process === RENTAL_PROCESS.BEFORE_RENTAL &&
        status === RENTAL_STATUS.CREATED) ||
      (process === RENTAL_PROCESS.RETURNED &&
        status === RENTAL_STATUS.RENTAL_PERIOD_ENDED) ||
      (process === RENTAL_PROCESS.RETURNED &&
        status === RENTAL_STATUS.BEFORE_AND_AFTER_COMPARED)
    );
  };

  const handleClick = async () => {
    if (isButtonDisabled()) return;

    try {
      if (process === RENTAL_PROCESS.BEFORE_RENTAL) {
        if (status === RENTAL_STATUS.CREATED) {
          setModal(true);
          return;
        } //물품 결제 완료
      } else if (process === RENTAL_PROCESS.RETURNED) {
        if (status === RENTAL_STATUS.RENTAL_PERIOD_ENDED) {
          router.push(`/safe-deal/${rentalId}/after/photos-register`);

          return;
        } else if (status === RENTAL_STATUS.BEFORE_AND_AFTER_COMPARED) {
          router.push(`/safe-deal/${rentalId}/after/analysis`);
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
  console.log("charge : ", charge);
  return (
    <>
      <div
        className={disabled ? "action-btn-disabled" : "action-btn-enabled"}
        onClick={disabled ? undefined : handleClick}
      >
        {label}
      </div>
      {/* 계좌 등록 */}
      {isModal && (
        <PaymentApplyModal
          charge={charge}
          rentalId={rentalId.toString()}
          setIsModalOpen={setModal}
        />
      )}
      {/* 보증금 반환 */}
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
