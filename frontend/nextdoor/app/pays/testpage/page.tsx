"use client"

import HandleDepositModal from "@/components/pays/modals/HandleDepositModal";
import AlertMessage from "@/components/common/AlertMessage";
import { useEffect, useState } from "react";

export default function TestPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAlertMessageOpen, setIsAlertMessageOpen] = useState(false);
    const [alertExiting, setAlertExiting] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isAlertMessageOpen) {
            // 2초 후에 알림 메시지 닫기 시작
            timer = setTimeout(() => {
                // 먼저 exit 애니메이션 시작
                setAlertExiting(true);

                // exit 애니메이션 완료 후 알림 메시지 완전히 제거
                setTimeout(() => {
                    setIsAlertMessageOpen(false);
                    setAlertExiting(false);
                }, 500); // 애니메이션 지속시간 
            }, 2000);
        }

        return () => clearTimeout(timer);
    }, [isAlertMessageOpen]);

    const handleShowAlert = () => {
        if (!isAlertMessageOpen) {
            setIsAlertMessageOpen(true);
        }
    };

    return (
        <div className="relative flex flex-col min-h-screen items-center justify-center px-10">
            <button
                onClick={handleShowAlert}
                className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500"
            >
                AlertMessage 띄우기
            </button>

            {(isAlertMessageOpen) && (
                <AlertMessage txt="결제가 요청되었습니다!" exiting={alertExiting} />
            )}
        </div>
    );
}