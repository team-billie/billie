interface HistoryItemProps {
    img: string;
    name: string;
    date: string;
    amount: string;
    type: "charge" | "transferPlus" | "transferMinus";
}

export default function HistoryItem({ img, name, date, amount, type }: HistoryItemProps) {
    return (
        <div className="flex gap-2 items-center">
            <div className="w-12 h-12 bg-gray300 rounded-lg" />
            <div className="flex-1 flex items-center justify-between">
                <div className="flex flex-col text-sm">
                    <span className="font-bold">{name}</span>
                    <span>{date} {type === "charge" ? "충전" : "송금"}</span>
                </div>

                <div className="font-bold text-blue400" >{type === "transferMinus" ? "-" : "+"}{amount}원</div>
            </div>
        </div>
    )
}