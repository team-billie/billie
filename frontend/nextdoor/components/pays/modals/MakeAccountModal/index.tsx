'use client';
import axiosInstance from "@/lib/api/instance";
import Button from "../../common/Button";
import { AddAccountRequest } from "@/lib/api/pays";
import { getBankInfo } from "@/lib/utils/getBankInfo";
import { AddAccountRequestDto } from "@/types/pays/request";
import { useRouter } from "next/navigation";
import { useAlertStore } from "@/lib/store/useAlertStore";


interface MakeAccountModalProps {
    account: AddAccountRequestDto;
}

export default function MakeAccountModal({account}: MakeAccountModalProps){
    const router = useRouter();
    const { showAlert } = useAlertStore();

    const handleBtn = (register: boolean) => {
        if(register){
        console.log("앱에 등록하기");
        AddAccountRequest(account).then((res) => {
            showAlert("앱에 계좌가 등록되었습니다!", "success");
        });
        }else{
            console.log("나중에 등록하기");
        }

        axiosInstance.post("/api/v1/fintechs/accounts/deposit", {
            "userKey": account.userKey,
            "accountNo": account.accountNo,
            "transactionBalance": 200000,
            "transactionSummary": "(수시입출금) : 생성 계좌 돈 입금"
          }).then((res) => {
            console.log("입금 완료");
        })

        router.push("/profile");
    }

    return(
    <>
        <div className="absolute top-0 bottom-0 right-0 left-0 bg-gray900 flex-1 bg-opacity-70" />
            <div className="min-h-[48vh] flex flex-col w-full overflow-y-auto bg-white rounded-2xl transform transition-transform duration-300 translate-y-0">
                <div className="font-bold text-lg w-full text-gray700 border-b border-gray400 text-center py-3">계좌 등록</div>
                <div className="flex-1 flex flex-col gap-4 p-4 text-lg">
                    <div>
                    <div>{getBankInfo(account.bankCode)?.bankName} 계좌 생성을 축하드립니다!</div>
                    <div>이용을 위해 계좌로 200,000만원이 입금되었습니다.</div>
                    </div>
                    <div className="flex flex-col text-2xl gap-1 font-bold text-blue400">
                        <div>원활한 진행을 위해</div>
                        <div>해당 계좌를 앱에 등록할까요?</div>
                        <div className="text-gray900">{account.accountNo}</div>
                    </div>
                    <div>미등록시 내 계좌 페이지에서 등록이 가능합니다. 미등록된 계좌번호는 <span className="font-bold">다시 확인하기 어려우니</span> 꼭 따로 저장해두시고 등록하시길 바랍니다.</div>
                </div>
                <div className="flex flex-col gap-4 p-4">
                    <Button state={true} txt="앱에 등록하기" onClick={() => handleBtn(true)} />
                    <Button state={false} txt="나중에 등록하기" onClick={() => handleBtn(false)} />
                </div>
        </div>
    </>)
}