import { ChevronDown } from "lucide-react"
import Header from "@/components/pays/common/Header";
import Button from "@/components/pays/common/Button";

export default function RechargePage() {
    return (
    <div className="flex flex-col min-h-screen">
    <Header txt="충전" />
    <div className="flex-1 flex flex-col items-center">
        <div className="flex flex-col items-center mb-10 mt-20 text-gray600">
            <div className="flex gap-2 items-center justify-center">
                <div className="w-5 text-center bg-yellow-300 font-extrabold text-gray900">B</div>
                <div className="text-gray900 font-semibold">내 <span>카카오뱅크</span> 계좌에서</div>
                <ChevronDown className="w-4 h-full"/>
            </div>
            <div className="text-sm">3333139177983</div>
        </div>
        
        <div className="flex flex-col items-center">
            <input type="text" className="border-none px-1 w-56 text-2xl font-bold focus:outline-none focus:ring-0 placeholder-gray400" placeholder="얼마를 충전할까요?"/>
            <div className="text-xs text-gray600">빌리페이 잔액 <span>0</span>원</div>
        </div>

        <div className="flex text-gray900 text-sm mt-5 py-5 gap-3">
            <div className="border border-gray300 px-3 py-1 rounded-2xl" >+1만원</div>
            <div className="border border-gray300 px-3 py-1 rounded-2xl" >+5만원</div>
            <div className="border border-gray300 px-3 py-1 rounded-2xl" >+10만원</div>
        </div>

        <div className="p-4 w-full flex-1 flex items-end">
            <Button txt="충전하기" state={true}/>
        </div>
    </div>
    </div>
    );
}