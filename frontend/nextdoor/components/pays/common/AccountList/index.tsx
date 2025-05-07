import { bankList } from "@/lib/utils/getBankInfo";

export default function AccountList() {
    const isMainAccount = true;
    
    return (
        <div className="flex flex-col gap-3">
            {bankList.map((bank) => (
                <div className="flex items-center justify-between p-4 border border-gray400 rounded-lg">
                    <div className="flex items-center gap-2">
                        <img
                            src={bank.image}
                            alt={bank.bankName}
                            className="w-7 h-7 rounded-full"
                            />
                        <div className="text-lg font-bold">{bank.bankName}</div>
                        <div>3333139177983</div>
                    </div>
                    {isMainAccount && <div className="text-white text-xs bg-blue400 px-2 py-1 rounded-lg">주계좌</div>}
                </div>
            ))}
        </div>
    );
}
