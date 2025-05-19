// 계좌 번호 | 금액 

import { Controller, useFormContext } from "react-hook-form";

export function AccountInput() {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name="accountNo"
            render={({ field: { onChange, value } }) => (
                <input
                    type="number"
                    className="w-full py-5 px-4 border border-gray400 rounded-lg text-lg font-bold focus:outline-none focus:ring-0 placeholder-gray500"
                    placeholder="계좌번호 입력"
                    onChange={onChange}
                    value={value}
                />
            )}
        />
    )
}

export function AmountInput(props: { placeholderTxt: string }) {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name="transactionBalance"
            render={({ field: { onChange, value } }) => (
                <input
                    type="number"
                    className="border-none px-1 w-56 text-2xl font-bold focus:outline-none focus:ring-0 placeholder-gray400"
                    placeholder={props.placeholderTxt}
                    onChange={onChange}
                    value={value}
                />
            )}
        />
    )
}

