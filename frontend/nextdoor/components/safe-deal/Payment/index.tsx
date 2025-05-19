"use client";

import Button from "@/components/pays/common/Button";
import Header from "@/components/pays/common/Header";
import Loading from "@/components/pays/common/Loading";
import AutoRechargeModal from "@/components/pays/modals/AutoRechargeModal";
import { PayItemRequest } from "@/lib/api/pays";
import useUserStore from "@/lib/store/useUserStore";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GetPaymentDataRequest, HoldDepositRequest } from "@/lib/api/pays";
import { GetPaymentDataResponseDto } from "@/types/pays/response";
import { useAlertStore } from "@/lib/store/useAlertStore";
import { formatNumberWithCommas } from "@/lib/utils/money";
import { CircleAlert } from "lucide-react";

export default function Payment() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  // 빌리 잔액 : zustand
  const { billyAccount, userKey } = useUserStore();
  const balance = billyAccount?.balance ?? 0;
  const { showAlert } = useAlertStore();

  const [isChargeNeeded, setIsChargeNeeded] = useState(false);

  const [paymentData, setPaymentData] =
    useState<GetPaymentDataResponseDto | null>(null);

  const sendBtnHandler = (isAfterRecharge: boolean = false) => {
    if (!isAfterRecharge && isChargeNeeded) {
      console.log("충전 필요");
      setIsModalOpen(true);
      return;
    }

    setIsLoading(true);
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
    <div className="relative flex flex-col min-h-[100dvh]">
      {isLoading
        ? <Loading type="payment" isSuccess={isSuccess} headerTxt="결제" />
        : <><Header txt="결제하기" />
          <div className="flex-1 flex flex-col items-center px-6 py-4">
            <div className="w-full flex-1 flex flex-col gap-4">

              {/* 물품정보 */}
              {/* <div className="flex items-center gap-3 border-b border-gray300 pb-4">
                <div className="w-16 h-16 rounded-lg bg-gray500" />
                <div className="flex flex-col gap-1">
                  <div className="text-gray900 text-lg">다이슨 헤어 드라이기(임시)</div>
                  <div className="text-gray600 text-sm">3일</div>
                </div>
                </div> */}

              <div className="flex-1 flex flex-col text-3xl items-center justify-center gap-2 border-b border-gray300 pb-16">
                <div className="text-blue400 font-semibold">{formatNumberWithCommas(rentalFeeAmount + depositAmount)}원을</div>
                <div className="text-gray900 font-semibold">보낼까요?</div>
                <div className="flex justify-end gap-1 text-gray600 text-sm mb-4">
                  <span>빌리페이 잔액 {balance}원</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 border-b border-gray300 pb-4">

                <div className="flex items-center justify-between gap-2 font-semibold">
                  <div className="flex items-center gap-2 text-gray600">
                    <div className="w-8 h-8 rounded-full bg-gray500" />
                    <div>대여료</div>
                  </div>
                  <div className="text-gray800 text-lg">{formatNumberWithCommas(rentalFeeAmount)}원</div>
                </div>

                <div className="flex items-center justify-between gap-2 font-semibold">
                  <div className="flex items-center gap-2 text-gray600">
                    <img src="/images/banks/billypay.png" className="w-8 h-8 rounded-full bg-gray500" />
                    <div>보증금</div>
                  </div>
                  <div className="text-gray800 text-lg">{formatNumberWithCommas(depositAmount)}원</div>
                </div>

                <div className="text-gray600 flex items-center gap-2 mt-2">
                  <CircleAlert className="w-5 h-5" />
                  <span>보증금은 빌리페이에서 안전하게 보관됩니다.</span>
                </div>

              </div>

            </div>

            <div className="flex flex-col w-full  gap-2">
              <Button txt={`결제하기`} state={true} onClick={() => sendBtnHandler()} />
              <Button txt={`AI 결과 다시 보기`} state={false} onClick={() => router.push(`/safe-deal/${id}/before/analysis`)} />
            </div>
          </div>
        </>
      }

      {isModalOpen &&
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <AutoRechargeModal setIsModalOpen={setIsModalOpen} sendBtnHandler={sendBtnHandler} needCharge={chargeNeeded} />
        </div>
      }
    </div>
  );
}
