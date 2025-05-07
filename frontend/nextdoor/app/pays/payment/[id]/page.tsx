import Header from "@/components/pays/common/Header";
import Button from "@/components/pays/common/Button";
import { ChevronDown } from "lucide-react";

export default function PaymentPage() {
    return (
    <div className="flex flex-col min-h-screen">
        <Header txt="빌리페이 송금" />
        <div className="flex-1 flex flex-col items-center p-4">
            <div className="flex-1 flex flex-col items-center justify-center gap-3">
                <div className="flex items-center gap-2 mb-10">
                    <div className="w-8 h-8 rounded-full bg-gray500"></div>
                    <div className="text-gray900 text-lg"><span className="font-semibold">단추</span>님에게</div>
                </div>
                <div className="text-gray900 text-4xl font-semibold">2,000원</div>
                <div className="flex items-center gap-1 text-gray600 mb-60">
                    <span>자동충전 1,000 | </span>
                    <span className="font-semibold text-gray900">카카오뱅크 7982</span>
                    <ChevronDown className="w-4 h-4"/>
                </div>
            </div>
            <Button txt="보내기" state={true}/>
        </div>
    </div>
  );
  }