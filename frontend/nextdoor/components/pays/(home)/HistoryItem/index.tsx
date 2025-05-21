import { getBankInfo } from "@/lib/utils/getBankInfo";
import { formatNumberWithCommas } from "@/lib/utils/money";

interface HistoryItemProps {
    name: string;
    date: string;
    amount: string;
    type: "charge" | "transferPlus" | "transferMinus";
    code: string;
}

export default function HistoryItem({ code, name, date, amount, type }: HistoryItemProps) {
    const bankInfo = getBankInfo(code ?? "999");

    return (
        <div className="flex gap-2 items-center">
            <img src={bankInfo?.image} className="w-12 h-12 rounded-lg" />
            <div className="flex-1 flex items-center justify-between">
                <div className="flex flex-col text-sm">
                    <span className="font-bold">{name}</span>
                    <span>{date} {type === "transferMinus" ? "출금" : "입금"}</span>
                </div>

                <div className={`${type === "transferMinus" ? "text-[#FF637D]" : "text-blue400"} font-bold`} >{type === "transferMinus" ? "-" : "+"}{formatNumberWithCommas(amount)}원</div>
            </div>
        </div>
    )
}