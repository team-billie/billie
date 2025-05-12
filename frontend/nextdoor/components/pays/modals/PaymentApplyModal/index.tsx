'use client';

import ChangeCharge from "./ChangeCharge";
import SelectAccount from "./SelectAccount"
import { useState } from "react";

interface PaymentModalProps{
    charge: number;
    rentalId: string;
    setIsModalOpen: (isModalOpen: boolean) => void;
}

export default function PaymentApplyModal({charge, rentalId, setIsModalOpen}: PaymentModalProps){
    const [changeBtnClicked, setChangeBtnClicked] = useState(false)
    const [payCharge, setPayCharge] = useState(charge)

    return(
    <>
        <div className="min-h-[45vh] p-4 flex flex-col gap-3 w-full overflow-y-auto bg-white rounded-2xl transform transition-transform duration-300 translate-y-0">
            { changeBtnClicked 
                ?<ChangeCharge setPayCharge={setPayCharge} setChangeBtnClicked={setChangeBtnClicked}/>
                :<SelectAccount setIsModalOpen={setIsModalOpen} payCharge={payCharge} setChangeBtnClicked={setChangeBtnClicked} rentalId={rentalId}/>
            }
        </div>
    </>)
}