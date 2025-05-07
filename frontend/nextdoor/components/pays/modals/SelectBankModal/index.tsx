import { bankList, BankDto } from "@/lib/utils/getBankInfo";

interface SelectBankModalProps {
    setIsModalOpen: (isModalOpen: boolean) => void;
    setSelectedBank: (selectedBank: BankDto) => void;
}

export default function SelectBankModal({setIsModalOpen, setSelectedBank}: SelectBankModalProps){
    return (
        <div className="absolute max-h-[70vh] overflow-y-auto bottom-0 bg-white w-full rounded-t-3xl transform transition-transform duration-300 translate-y-0">
            <div className="sticky bg-white top-0 px-4 pt-4 pb-2 font-bold text-lg">은행</div>
            <div className="grid grid-cols-3 items-center m-2">
            {bankList.map((bank) => (
                <div
                    onClick={() => {
                        setSelectedBank(bank);
                        setIsModalOpen(false);
                    }}
                    key={bank.bankCode}
                    className="flex flex-col gap-2 items-center bg-gray100 p-4 m-2 rounded-lg"
                    >
                <img
                    src={bank.image}
                    alt={bank.bankName}
                    className="w-10 h-10 rounded-full"
                />
                <span className="text-xs font-semibold">{bank.bankName}</span>
                </div>
            ))}
            </div>
        </div>
    );
  }