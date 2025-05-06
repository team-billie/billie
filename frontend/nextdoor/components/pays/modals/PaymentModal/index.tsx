'use client';

import { ChevronDown } from "lucide-react" 
import { getBankInfo } from "@/lib/utils/getBankInfo"
import Button from "../../common/Button"
import { useState } from "react"

export default function PaymentModal(){
    const bankInfo = getBankInfo('090')
    const [billySelected, setBillySelected] = useState(true)
    const btnClickHandler = () => {
        setBillySelected(!billySelected)
    }

    return(
    <div className="relative flex flex-col min-h-screen items-center justify-center px-10">
        <div className="absolute top-0 bottom-0 right-0 left-0 bg-gray900 flex-1 bg-opacity-70" />
        <div className="min-h-[50vh] p-4 flex flex-col gap-3 w-full overflow-y-auto bg-white rounded-2xl transform transition-transform duration-300 translate-y-0">
            <div className="flex justify-between items-center">
                <div className="mt-5 font-bold text-xl">
                    <div><span className="text-blue400">100원</span>을</div>
                    <div>어디로 받을까요?</div>
                </div>
                <div className="font-bold text-sm px-3 py-2 bg-gray200 rounded-2xl">금액변경</div>
            </div>
            
            <div className=" flex-1 flex flex-col gap-3 justify-end">
                <button onClick={btnClickHandler} className={` ${billySelected ? 'border-blue200' : 'border-gray400'} flex items-center gap-2 p-3 border rounded-lg`}>
                    <img 
                        src="/images/banks/ssafy.png"
                        alt="billy pay"
                        className="w-6 h-6 rounded-full"
                    />
                    <div className="flex flex-col items-start">
                        <div className="font-bold">빌리 페이로 받기</div>
                        <div className="text-xs text-gray600">계좌 노출없이 받을 수 있어요</div>
                    </div>
                </button>
                
                <button onClick={btnClickHandler} className={`${billySelected ? 'border-gray400' : 'border-blue200'} flex items-center gap-2 p-3 border rounded-lg`}>
                    <img 
                        src={bankInfo?.image}
                        alt={bankInfo?.bankName}
                        className="w-6 h-6 rounded-full"
                    />
                    <div className="flex flex-col items-start">
                        <div className="font-bold">내 계좌로 받기</div>
                        <div className="flex items-center gap-[1px] text-xs text-gray600">
                            <span>{bankInfo?.bankName} 7983</span>
                            <ChevronDown className="mt-[2px] w-4 h-4"/>
                        </div>
                    </div>
                </button>

                <div className="mt-5">
                    <Button txt="확인" state={true}/>           
                </div>
            </div>
        </div>
    </div>)
}