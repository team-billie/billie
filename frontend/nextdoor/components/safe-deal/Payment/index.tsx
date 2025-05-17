"use client";

import Loading from "@/components/pays/common/Loading";
import AutoRechargeModal from "@/components/pays/modals/AutoRechargeModal";
import { PayItemRequest } from "@/lib/api/pays";
import useUserStore from "@/lib/store/useUserStore";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GetPaymentDataRequest, HoldDepositRequest } from "@/lib/api/pays";
import { GetPaymentDataResponseDto } from "@/types/pays/response";
import Button from "../Button";
import GrayButton from "../GrayButton";
export default function Payment() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  // 빌리 잔액 : zustand
  const { billyAccount, userKey } = useUserStore();
  const balance = billyAccount?.balance ?? 0;

  // 이체할 금액, 사람, 계좌 : api 호출
  const amount = 30000;

  const [isChargeNeeded, setIsChargeNeeded] = useState(false);

  const [paymentData, setPaymentData] =
    useState<GetPaymentDataResponseDto | null>(null);

  const sendBtnHandler = (isAfterRecharge: boolean = false) => {
    if (!isAfterRecharge && isChargeNeeded) {
      console.log("충전 필요");
      setIsModalOpen(true);
      return;
    }

    try {
      PayItemRequest({
        userKey: userKey,
        depositAccountNo: paymentData?.accountNo ?? "",
        transactionBalance: rentalFeeAmount,
        withdrawalAccountNo: billyAccount?.accountNo ?? "",
        depositTransactionSummary: "빌리페이 입금",
        withdrawalTransactionSummary: "빌리페이 출금",
        rentalId: Number(id),
      })
        .then((res) => {
          console.log(res);
          alert("대여 결제 완료");
          router.push("/profile");
        })
        .catch(() => {
          alert("대여 결제 실패");
        });

      // 보증금 보관 api 호출
      HoldDepositRequest({
        userKey: userKey,
        rentalId: Number(id),
        accountNo: billyAccount?.accountNo ?? "",
        amount: depositAmount,
      })
        .then((res) => {
          console.log(res);
          alert("보증금 보관 완료");
        })
        .catch(() => {
          alert("보증금 보관 실패");
        });
    } catch (error) {
      alert("결제 실패");
    }
  };
  const aIBtnHandler = () => {
    console.log("AI분석 결과 다시 보기");
  };

  const [rentalFeeAmount, setRentalFeeAmount] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0);
  //params에서 id값 가져오기
  const { id } = useParams();

  const [chargeNeeded, setChargeNeeded] = useState(0);
  useEffect(() => {
    GetPaymentDataRequest(id as string).then(
      (res: GetPaymentDataResponseDto) => {
        console.log(res);

        setPaymentData(res);
        setRentalFeeAmount(res.rentalFee);
        setDepositAmount(res.deposit);
        const chargeAmount = rentalFeeAmount + depositAmount - balance;
        setChargeNeeded(chargeAmount);
        setIsChargeNeeded(chargeAmount > 0);
      }
    );
  }, []);

  return (
    <div className="relative flex flex-col min-h-[100dvh]">
      {isLoading ? (
        <Loading txt="결제가" isSuccess={isSuccess} headerTxt="빌리페이 송금" />
      ) : (
        <>
          <div className="flex-1 flex flex-col items-center p-6">
            <div className="w-full flex-1 flex flex-col items-center gap-3 pt-44">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-gray500"></div>
                <div className="text-gray900 text-lg">
                  <span className="font-semibold">
                    {paymentData?.ownerNickname}
                  </span>
                  님에게
                </div>
              </div>
              <div className="text-gray900 text-4xl font-semibold">
                {rentalFeeAmount + depositAmount}원
              </div>
              <div className="flex items-center gap-1 text-gray600 mb-60">
                <span>빌리페이 잔액 {balance} 원</span>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <Button txt="결제하기" onClick={() => sendBtnHandler()} />
              <GrayButton
                txt="AI 분석 결과 다시 보기"
                onClick={() => router.push(`/safe-deal/${id}/before/analysis`)}
              />
            </div>
          </div>
        </>
      )}

      {isModalOpen && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <AutoRechargeModal
            setIsModalOpen={setIsModalOpen}
            sendBtnHandler={sendBtnHandler}
            needCharge={chargeNeeded}
          />
        </div>
      )}
    </div>
  );
}
