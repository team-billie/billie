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
import PaymentTitle from "./PaymentTitle";
import Header from "../Header";
import GradientButton from "./GradientBtn";
import { useAlertStore } from "@/lib/store/useAlertStore";
export default function Payment() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const { showAlert } = useAlertStore();

  // 빌리 잔액 : zustand
  const { billyAccount, userKey } = useUserStore();
  const balance = billyAccount?.balance ?? 0;

  // 이체할 금액, 사람, 계좌 : api 호출
  const amount = 30000;

  const [isChargeNeeded, setIsChargeNeeded] = useState(false);

  const [paymentData, setPaymentData] =
    useState<GetPaymentDataResponseDto | null>(null);
  console.log(paymentData);

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
          showAlert("대여 결제 완료", "success");
          router.push("/profile");
        })
        .catch(() => {
          showAlert("대여 결제 실패", "error");
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
          showAlert("보증금 보관 완료", "success");
        })
        .catch(() => {
          showAlert("보증금 보관 실패", "error");
        });
    } catch (error) {
      showAlert("결제 실패", "error");
    }
  };

  const [rentalFeeAmount, setRentalFeeAmount] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0);
  //params에서 id값 가져오기
  const { id } = useParams();

  const [chargeNeeded, setChargeNeeded] = useState(0);
  useEffect(() => {
    GetPaymentDataRequest(id as string).then(
      (res: GetPaymentDataResponseDto) => {
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
    <div className="relative h-[100dvh] overflow-auto flex flex-col">
      <div className="fixed top-0 left-0 w-full z-10 bg-graygradient">
        <Header txt={"결제하기"} />
      </div>
      <PaymentTitle />
      {/* ✅ 중간 콘텐츠 */}
      <div className="flex-1 flex flex-col items-center justify-center  pb-[300px] text-center">
        <div className="flex items-center gap-2 mb-6 mt-6">
          <div className="text-gray900 text-lg">
            <span className="font-semibold text-2xl px-2">
              {paymentData?.ownerNickname}
            </span>
            님에게
          </div>
        </div>

        <div className="text-gray900 flex items-center gap-2 mb-2">
          <div className="text-lg">대여료</div>
          <div className="font-semibold text-2xl">{rentalFeeAmount}원</div>
        </div>

        <div className="text-gray900 flex items-center gap-2 mb-4">
          <div className="text-lg">보증금</div>
          <div className="font-semibold text-2xl">{depositAmount}원</div>
        </div>
        <div className="text-gray900 flex items-center gap-2 mb-4">
          <div className="text-2xl">총</div>
          <div className="font-semibold text-4xl">
            {rentalFeeAmount + depositAmount}원
          </div>
        </div>
        <div>이 결제 됩니다</div>
        <div className="flex items-center gap-1 text-gray600 pt-4">
          <span>빌리페이 잔액 {balance}원</span>
        </div>
        <div className="p-4">보증금은 빌리페이에서 안전하게 보관됩니다</div>
      </div>

      {/* ✅ 고정된 하단 버튼 영역 */}
      <div className="fixed bottom-0 left-0 w-full px-6 py-6 bg-white z-10 shadow-[0_-2px_8px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col gap-2 w-full">
          <GradientButton txt="결제하기" onClick={() => sendBtnHandler()} />
          <GrayButton
            txt="AI 분석 결과 다시 보기"
            onClick={() => router.push(`/safe-deal/${id}/before/analysis`)}
          />
        </div>
      </div>
    </div>
  );
}
