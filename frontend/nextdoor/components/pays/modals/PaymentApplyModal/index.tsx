"use client";

import ChangeCharge from "./ChangeCharge";
import SelectAccount from "./SelectAccount";
import { useState } from "react";

interface PaymentModalProps {
  charge: number;
  rentalId: string;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

export default function PaymentApplyModal({
  charge,
  rentalId,
  setIsModalOpen,
}: PaymentModalProps) {
  const [changeBtnClicked, setChangeBtnClicked] = useState(false);
  const [payCharge, setPayCharge] = useState(charge);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="min-h-[45vh] p-4 flex flex-col gap-3 w-full max-w-md mx-4 overflow-y-auto bg-white rounded-2xl transform transition-transform duration-300 translate-y-0">
        {changeBtnClicked ? (
          <ChangeCharge
            setPayCharge={setPayCharge}
            setChangeBtnClicked={setChangeBtnClicked}
          />
        ) : (
          <SelectAccount
            setIsModalOpen={setIsModalOpen}
            payCharge={payCharge}
            setChangeBtnClicked={setChangeBtnClicked}
            rentalId={rentalId}
          />
        )}
      </div>
    </div>
  );
}
