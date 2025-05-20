"use client";

import { ChevronDown } from "lucide-react";
import { getBankInfo } from "@/lib/utils/getBankInfo";
import Button from "@/components/pays/common/Button";
import { useState } from "react";
import Image from "next/image";

type CheckDepositProps = {
  payCharge: number;
  setChangeBtnClicked: React.Dispatch<React.SetStateAction<boolean>>;
  rentalImg: string;
  rentalId: number;
  handleSubmit: () => void;
};

export default function CheckDeposit({
  setChangeBtnClicked,
  payCharge,
  rentalImg,
  rentalId,
  handleSubmit,
}: CheckDepositProps) {
  const bankInfo = getBankInfo("090");
  const [billySelected, setBillySelected] = useState(true);
  const btnClickHandler = () => {
    setBillySelected(!billySelected);
  };

  return (
    <>
      <div className="flex-1 flex flex-col justify-center items-center gap-8">
        <div className="w-36 h-36 bg-gray400 rounded-full relative">
          <Image
            src={rentalImg}
            alt={`Product Img`}
            fill
            className="object-cover"
          />
        </div>
        <div className="font-bold text-lg">
          <div className="text-blue400">물품을 안전하게 받으셨나요?</div>
          <div>확인 시, 차감없이 보증금이 처리됩니다.</div>
        </div>
      </div>
      <div className="flex gap-3 mt-5">
        <Button
          onClick={() => setChangeBtnClicked(true)}
          txt="부분 환불"
          state={false}
        />
        <Button onClick={handleSubmit} txt="확인" state={true} />
      </div>
    </>
  );
}
