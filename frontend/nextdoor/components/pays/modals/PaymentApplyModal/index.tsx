"use client";

import ChangeCharge from "./ChangeCharge";
import SelectAccount from "./SelectAccount";
import { useState } from "react";
import { X } from "lucide-react";

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
      <div className="min-h-[37vh] p-4 flex flex-col gap-3 w-full max-w-md mx-4 overflow-y-auto bg-white rounded-2xl transform transition-transform duration-300 translate-y-0">
        <div className="flex justify-between text-gray900 items-center">
          <div className="w-6 h-6"/>
          <div className="text-xl font-bold">결제 요청</div>
          <X className="w-6 h-6 cursor-pointer" onClick={() => setIsModalOpen(false)} />
        </div>
        {changeBtnClicked ? (
          <ChangeCharge
            setPayCharge={setPayCharge}
            setChangeBtnClicked={setChangeBtnClicked}
            payCharge={payCharge}
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
