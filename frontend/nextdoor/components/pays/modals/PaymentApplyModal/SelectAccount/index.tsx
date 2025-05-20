"use client";

import { ChevronDown } from "lucide-react";
import { getBankInfo } from "@/lib/utils/getBankInfo";
import Button from "@/components/pays/common/Button";
import { useEffect, useState } from "react";
import useUserStore from "@/lib/store/useUserStore";
import { SelectOwnerAccountRequest } from "@/lib/api/pays";
import { SelectOwnerAccountRequestDto } from "@/types/pays/request/index";
import MyAccountListModal from "@/components/pays/modals/MyAccountListModal";
import { AddAccountResponseDto } from "@/types/pays/response";
import { useAlertStore } from "@/lib/store/useAlertStore";

type SelectAccountProps = {
  payCharge: number;
  setChangeBtnClicked: React.Dispatch<React.SetStateAction<boolean>>;
  rentalId: string;
  setIsModalOpen: (isModalOpen: boolean) => void;
  onReadyToSubmit?: (callback: () => Promise<void>) => void;
};

export default function SelectAccount({
  setChangeBtnClicked,
  payCharge,
  rentalId,
  setIsModalOpen,
  onReadyToSubmit,
}: SelectAccountProps) {
  const [billySelected, setBillySelected] = useState(true);

  const { mainAccount, billyAccount } = useUserStore();
  const btnClickHandler = () => {
    setBillySelected(!billySelected);
  };

  const [selectedAccount, setSelectedAccount] = useState<AddAccountResponseDto | null>(null);
  const [isAccountListModalOpen, setIsAccountListModalOpen] = useState(false);
  const selectAccount = selectedAccount ?? mainAccount;

  const { showAlert } = useAlertStore();

  const handleSelectAccount = async () => {
    try {
      if (billySelected) {
        await SelectOwnerAccountRequest(
          {
            accountNo: billyAccount?.accountNo || "",
            bankCode: billyAccount?.bankCode || "",
            finalAmount: payCharge,
          },
          rentalId
        );
      } else {
        await SelectOwnerAccountRequest(
          {
            accountNo: selectAccount?.accountNo || "",
            bankCode: selectAccount?.bankCode || "",
            finalAmount: payCharge,
          },
          rentalId
        );
      }
      showAlert("결제 요청이 완료되었습니다!", "success");
      // 계좌 선택 성공 시 모달 닫기
      setIsModalOpen(false);
    } catch (error) {
      showAlert("결제 요청을 다시 시도해주세요.", "error");
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (onReadyToSubmit) {
      onReadyToSubmit(handleSelectAccount);
    }
  }, [handleSelectAccount, onReadyToSubmit]);

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="mt-5 font-bold text-xl flex flex-col items-start">
          <div>
            <span className="text-blue400">{payCharge}원</span>을
          </div>
          <div>어디로 받을까요?</div>
        </div>
        <div
          onClick={() => setChangeBtnClicked(true)}
          className="font-bold text-sm px-3 py-2 bg-gray200 rounded-2xl cursor-pointer hover:bg-gray300"
        >
          금액변경
        </div>
      </div>

      <div className=" flex-1 flex flex-col gap-3 justify-end">
        <button
          onClick={btnClickHandler}
          className={` ${billySelected ? "border-blue200" : "border-gray400"
            } flex items-center gap-2 p-3 border rounded-lg`}
        >
          <img
            src="/images/banks/ssafy.png"
            alt="billy pay"
            className="w-6 h-6 rounded-full"
          />
          <div className="flex flex-col items-start">
            <div className="font-bold">빌리 페이로 받기</div>
            <div className="text-xs text-gray600">
              계좌 노출없이 받을 수 있어요
            </div>
          </div>
        </button>

        <button
          onClick={btnClickHandler}
          className={`${billySelected ? "border-gray400" : "border-blue200"
            } flex items-center gap-2 p-3 border rounded-lg`}
        >
          <img
            src={getBankInfo(selectAccount?.bankCode || "000")?.image || ""}
            alt={getBankInfo(selectAccount?.bankCode || "000")?.bankName || ""}
            className="w-6 h-6 rounded-full"
          />
          <div className="flex flex-col items-start">
            <div className="font-bold">내 계좌로 받기</div>
            <div
              onClick={() => setIsAccountListModalOpen(true)}
              className="flex items-center gap-[1px] text-xs text-gray600"
            >
              <span>
                {getBankInfo(selectAccount?.bankCode || "000")?.bankName || ""}{" "}
                {selectAccount?.accountNo}
              </span>
              <ChevronDown className="mt-[2px] w-4 h-4" />
            </div>
          </div>
        </button>

        <div className="mt-2">
          <Button txt="확인" onClick={handleSelectAccount} state={true} />
        </div>
      </div>
      {isAccountListModalOpen && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <MyAccountListModal
            type="small"
            setIsModalOpen={setIsAccountListModalOpen}
            setSelectedAccount={setSelectedAccount}
          />
        </div>
      )}
    </>
  );
}
