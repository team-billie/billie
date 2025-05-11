'use client';

import { useState } from "react";
import ChangeDeposit from "./ChangeDeposit";
import CheckDeposit from "./CheckDeposit";

interface PaymentModalProps{
    charge: number;
}

export default function HandleDepositModal({charge}: PaymentModalProps){
    const [changeBtnClicked, setChangeBtnClicked] = useState(false)
    const [payCharge, setPayCharge] = useState(charge)

    return(
    <>
        <div className="absolute top-0 bottom-0 right-0 left-0 bg-gray900 flex-1 bg-opacity-70" />
        <div className="min-h-[48vh] flex flex-col gap-3 w-full overflow-y-auto bg-white rounded-2xl transform transition-transform duration-300 translate-y-0">
            <div className="font-bold text-lg w-full text-gray700 border-b border-gray400 text-center py-3">보증금 처리</div>
            <div className="flex-1 flex flex-col gap-3 p-4">
                { changeBtnClicked 
                    ?<ChangeDeposit setPayCharge={setPayCharge} setChangeBtnClicked={setChangeBtnClicked}/>
                    :<CheckDeposit payCharge={payCharge} setChangeBtnClicked={setChangeBtnClicked}/>
                }
            </div>
        </div>
    </>)
}