'use client';

import ChangeCharge from "./ChangeCharge";
import SelectAccount from "./SelectAccount"
import { useState } from "react";

interface PaymentModalProps{
    charge: number;
}

export default function PaymentModal({charge}: PaymentModalProps){
    const [changeBtnClicked, setChangeBtnClicked] = useState(false)
    const [payCharge, setPayCharge] = useState(charge)

    return(
    <div className="relative flex flex-col min-h-screen items-center justify-center px-10">
        <div className="absolute top-0 bottom-0 right-0 left-0 bg-gray900 flex-1 bg-opacity-70" />
        <div className="min-h-[45vh] p-4 flex flex-col gap-3 w-full overflow-y-auto bg-white rounded-2xl transform transition-transform duration-300 translate-y-0">
            { changeBtnClicked 
                ?<ChangeCharge setPayCharge={setPayCharge} setChangeBtnClicked={setChangeBtnClicked}/>
                :<SelectAccount payCharge={payCharge} setChangeBtnClicked={setChangeBtnClicked}/>
            }
        </div>
    </div>)
}