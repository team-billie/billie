"use client";

import { useEffect, useState } from "react";
import ChangeDeposit from "./ChangeDeposit";
import CheckDeposit from "./CheckDeposit";
import { ReturnDepositRequest } from "@/lib/api/pays";
import { ReturnDepositRequestDto } from "@/types/pays/request";
import useUserStore from "@/lib/store/useUserStore";
import { useAlertStore } from "@/lib/store/useAlertStore";
import { useRouter } from "next/navigation";

interface HandleDepositModalProps {
  charge: number;
  rentalImg: string;
  rentalId: number;
  renterId: number;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

export default function HandleDepositModal({
  charge,
  rentalImg,
  renterId,
  rentalId,
  setIsModalOpen,
}: HandleDepositModalProps) {
  const [changeBtnClicked, setChangeBtnClicked] = useState(false);
  const [deductedAmount, setDeductedAmount] = useState(0);
  const [payCharge, setPayCharge] = useState(charge);
  const { userKey, billyAccount } = useUserStore();
  const { showAlert } = useAlertStore();
  const router = useRouter();
  const handleSubmit = () => {
    const requestBody: ReturnDepositRequestDto = {
      userKey: userKey,
      rentalId: rentalId,
      deductedAmount: deductedAmount,
      accountNo: billyAccount?.accountNo ?? "",
      renterId: renterId,
    };

    ReturnDepositRequest(requestBody)
      .then((res) => {
        showAlert("보증금 처리가 완료되었습니다!", "success");
      })
      .catch((err) => {
        showAlert("보증금 처리 실패하였습니다.", "error");
      });
    router.push("/profile");
    setIsModalOpen(false);
  };

  useEffect(() => {
    const amount = charge - payCharge;
    setDeductedAmount(amount);
  }, [payCharge]);

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="min-h-[45vh] p-4 flex flex-col gap-3 w-full max-w-md mx-4 overflow-y-auto bg-white rounded-2xl transform transition-transform duration-300 translate-y-0">
          {changeBtnClicked ? (
            <ChangeDeposit
              payCharge={payCharge}
              handleSubmit={handleSubmit}
              charge={charge}
              setPayCharge={setPayCharge}
              setChangeBtnClicked={setChangeBtnClicked}
            />
          ) : (
            <CheckDeposit
              handleSubmit={handleSubmit}
              rentalImg={rentalImg}
              rentalId={rentalId}
              payCharge={payCharge}
              setChangeBtnClicked={setChangeBtnClicked}
            />
          )}
        </div>
      </div>
    </>
  );
}
