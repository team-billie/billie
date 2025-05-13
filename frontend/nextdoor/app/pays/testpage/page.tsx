"use client"

import HandleDepositModal from "@/components/pays/modals/HandleDepositModal";

import { useState } from "react";
export default function TestPage() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    return (
        <div className="relative flex flex-col min-h-screen items-center justify-center px-10">
            <button onClick={() => setIsModalOpen(true)}>모달 열기</button>
            {isModalOpen && 
                <div className="absolute inset-0 bg-gray900 flex-1 flex items-center justify-center p-10 bg-opacity-70" >
                    <HandleDepositModal charge={10000} rentalImg="" rentalId={1} renterId={1} setIsModalOpen={setIsModalOpen}/>
                </div>
            }
        </div>
    )
}