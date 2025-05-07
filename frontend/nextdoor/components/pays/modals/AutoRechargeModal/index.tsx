"use client";

import { ChevronDown } from "lucide-react";
import Button from "../../common/Button";
import { useState, useEffect } from "react";

interface AutoRechargeModalProps {
    setIsModalOpen: (isModalOpen: boolean) => void;
}

export default function AutoRechargeModal({ setIsModalOpen }: AutoRechargeModalProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const submitBtnHandler = () => {
        setIsVisible(false);
        setTimeout(() => setIsModalOpen(false), 300);
    }

    return (
        <div className={`absolute bottom-0 bg-white rounded-t-2xl w-full flex flex-col gap-2 border-t p-6 transform transition-transform duration-500 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
            <div className="text-blue400 text-2xl font-semibold mb-2">Billy Pay</div>
            <div className="flex justify-between items-center gap-2 text-lg font-semibold ">
                <div className="text-gray600">충전 계좌</div>
                <div className="flex items-center gap-2">
                    <span>카카오뱅크 3333139177983</span>
                    <ChevronDown className="w-4 h-4"/>
                </div>
            </div>
            <div className="flex justify-between items-center gap-2 text-lg font-semibold mb-6">
                <div className="text-gray600">자동충전</div>
                <div className="flex items-center gap-1">
                    <span>1,000원</span>
                </div>
            </div>

            <Button txt="보내기" state={true} onClick={submitBtnHandler}/>
        </div>
    );
}
