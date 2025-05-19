import Button from "@/components/pays/common/Button"

type ChangeDepositProps = {
    setPayCharge: React.Dispatch<React.SetStateAction<number>>;
    setChangeBtnClicked: React.Dispatch<React.SetStateAction<boolean>>;
    charge: number;
    payCharge: number;
    handleSubmit: () => void;
};

export default function ChangeDeposit({ setChangeBtnClicked, setPayCharge, charge, payCharge, handleSubmit }: ChangeDepositProps) {
    return (
        <>
            <div className="font-bold text-xl">
                <div className="text-sm mb-2">보증금 <span className="text-blue400">{charge}원</span></div>
                <div>보증금을 얼마로 정산 할까요?</div>
            </div>

            <div className=" flex-1 flex flex-col gap-3 justify-end">
                <div className="border-b">
                    {/* input값이 payCharge가 되면 좋겠어 */}
                    <input
                        type="text"
                        className="border-none px-1 text-2xl font-bold focus:outline-none focus:ring-0 placeholder-gray400"
                        placeholder="환불할 금액을 입력해주세요."
                        value={payCharge}
                        onChange={(e) => setPayCharge(Number(e.target.value))}
                    />
                </div>
                <div className="flex text-sm font-semibold text-blue300 gap-1 mb-6">
                    <div className="border border-blue300 rounded-full flex items-center justify-center w-5 h-5">!</div>
                    <span>변경된 금액으로 물품 대여인에게 환불 됩니다.</span>
                </div>
                <Button onClick={() => setChangeBtnClicked(false)} txt="변경 없이 정산하기" state={false} />
                <Button onClick={handleSubmit} txt="확인" state={true} />
            </div>
        </>
    )
}