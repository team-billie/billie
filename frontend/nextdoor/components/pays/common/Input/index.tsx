// 계좌 번호 | 금액 

import { Controller, useFormContext } from "react-hook-form";
import { formatNumberWithCommas } from "@/lib/utils/money";

export function AmountInput(props: { placeholderTxt: string }) {
    const { control } = useFormContext();

    const parseNumber = (value: string) => {
        return value.replace(/,/g, "");
    };

    return (
        <Controller
            control={control}
            name="transactionBalance"
            render={({ field: { onChange, value } }) => (
                <input
                    required
                    type="text"
                    inputMode="numeric"
                    pattern="\d*"
                    className="border-none px-1 w-56 text-2xl font-bold focus:outline-none focus:ring-0 placeholder-gray400"
                    placeholder={props.placeholderTxt}
                    onChange={(e) => {
                        const onlyNums = e.target.value.replace(/[^0-9]/g, "");
                        onChange(onlyNums);
                    }}
                    value={formatNumberWithCommas(value)}
                />
            )}
        />
    )
}

