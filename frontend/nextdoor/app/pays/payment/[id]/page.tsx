"use client";

import Header from "@/components/pays/common/Header";
import Button from "@/components/pays/common/Button";
import { useState } from "react";
import { Check } from "lucide-react";
import AutoRechargeModal from "@/components/pays/modals/AutoRechargeModal";
import Loading from "@/components/pays/common/Loading";

export default function PaymentPage() {
    const [autoRecharge, setAutoRecharge] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(true);

    const sendBtnHandler = () => {
        if (autoRecharge) { setIsModalOpen(true) }
    }

    return (
    <div className="relative flex flex-col min-h-screen">
        {isLoading 
        ?<Loading txt="결제가" isSuccess={isSuccess} headerTxt="빌리페이 송금"/>
        :<><Header txt="빌리페이 송금" />
        <div className="flex-1 flex flex-col items-center p-6">
            <div className="w-full flex-1 flex flex-col items-center gap-3 pt-44">
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 rounded-full bg-gray500"></div>
                    <div className="text-gray900 text-lg"><span className="font-semibold">단추</span>님에게</div>
                </div>
                <div className="text-gray900 text-4xl font-semibold">2,000원</div>
                <div className="flex items-center gap-1 text-gray600 mb-60">
                    <span>빌리페이 잔액 1,000 원</span>
                </div>
            </div>

            <Button txt="보내기" state={true} onClick={sendBtnHandler}/>
        </div>
        </>
        }
        
        {isModalOpen && 
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60">
                <AutoRechargeModal setIsModalOpen={setIsModalOpen}/>
            </div>
        }
    </div>
  );
  }