import Button from "@/components/pays/common/Button"

type ChangeChargeProps = {
    setPayCharge: React.Dispatch<React.SetStateAction<number>>;
    setChangeBtnClicked: React.Dispatch<React.SetStateAction<boolean>>;
  };

export default function ChangeCharge({setChangeBtnClicked, setPayCharge}: ChangeChargeProps){
    return(
        <>
            <div className="mt-5 font-bold text-xl">
                <div className="text-sm">원가 <span className="text-blue400">100원</span></div>
                <div>대여료를 얼마로 요청 할까요?</div>
            </div>
            
            <div className=" flex-1 flex flex-col gap-3 justify-end">
                <div className="border-b">
                    <input type="text" className="border-none px-1 text-2xl font-bold focus:outline-none focus:ring-0 placeholder-gray400" placeholder="금액을 입력해주세요."/>
                </div>
                <div className="flex text-xs font-semibold text-gray500 gap-1">
                    <div className="border border-gray400 rounded-full flex items-center justify-center w-4 h-4">!</div>
                    <span>변경된 금액에 보증금이 합산되어 결제 요청이 됩니다.</span>
                </div>
                <Button txt="확인" state={true}/>           
                <Button onClick={() => setChangeBtnClicked(false)} txt="변경취소" state={false}/>           
            </div>
        </>
    )
}