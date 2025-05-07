import Button from "@/components/pays/common/Button";
import Header from "@/components/pays/common/Header";
import { Check } from "lucide-react";

interface LoadingProps {
    txt: string;
    isSuccess: boolean;
    headerTxt: string;
}

export default function Loading({txt, isSuccess, headerTxt}: LoadingProps) {
  return (
    <div className="flex-1 flex flex-col items-center p-6">
        <Header txt={headerTxt} x={false}/>
        <div className="w-full flex-1 flex flex-col items-center gap-3 pt-60">
            { isSuccess 
                ? <><Check className="w-16 h-16 text-white bg-blue400 mb-6 rounded-full p-2"/>
                <div className="text-2xl font-semibold">{txt} 완료되었습니다!</div>
                </> 
                :<><span className="loading loading-ball loading-xl mb-6 text-blue400"/>
                <div className="text-2xl font-semibold">{txt} 처리되고 있어요!</div>
                </>}
        </div>
        <Button txt="확인" state={isSuccess}/>
    </div>
  );
}

