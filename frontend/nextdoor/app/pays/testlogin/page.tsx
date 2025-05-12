"use client"

import Header from "@/components/pays/common/Header";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { GetFinUserRequest, GetAddedListRequest } from "@/lib/api/pays";
import { GetFinUserRequestDto } from "@/types/pays/request";
import Button from "@/components/pays/common/Button";
import { GetFinUserResponseDto, AddAccountResponseDto } from "@/types/pays/response";
import useUserStore from "@/lib/store/useUserStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function TestLoginPage() {
    const router = useRouter();
    const { setUserKey, setBillyAccount, setAddedAccounts, setUserId } = useUserStore();
    const [userIdValue, setUserIdValue] = useState("")

    const form = useForm<GetFinUserRequestDto>({
        defaultValues: {
            apiKey: "c65e002a7f5343cd93b5f578d512e400",
            userId: "",
        },
    });

    const onSubmit = (data: GetFinUserRequestDto) => {
        GetFinUserRequest(data).then((res: GetFinUserResponseDto) => {
            console.log(res);
            setUserKey(res.userKey);
            setUserId(Number(userIdValue))

            GetAddedListRequest(res.userKey).then((res: AddAccountResponseDto[]) => {
                console.log(res[0]);
                setBillyAccount(res[0]);
            });
            alert("로그인 성공");
            router.push("/home");

        }).catch((error) => {
            alert("로그인 실패");
        });
    }

    
    return (
        <div className="flex flex-col gap-3">
            <Header txt="테스트 로그인" />
            <div className="flex-1 overflow-y-auto flex flex-col gap-3 p-4">
                <div className="text-3xl text-blue400 font-extrabold mb-4">테스트 로그인</div>
                <FormProvider {...form}>
                        <Controller
                            control={form.control}
                            name="userId"
                            render={({ field }) => 
                                <input 
                                    required
                                    type="text"
                                    placeholder="사용자 이메일"
                                    className="w-full border border-gray-500 rounded-md p-4"
                                    {...field} />}
                        />
                        <input
                            onChange={(e)=>{
                                setUserIdValue(e.currentTarget.value)
                            }}
                            value={userIdValue} 
                            required
                            type="number"
                            placeholder="사용자 번호"
                            className="w-full border border-gray-500 rounded-md p-4"
                            />
                        <Button txt="로그인" state={true} type="submit" onClick={form.handleSubmit(onSubmit)} />
                        <Button txt="테스트 유저 회원가입" state={false} onClick={() => router.push("/pays/testsignup")} />
                </FormProvider>
                <Link href="/pays/testsignup" className="text-center text-gray-500 text-sm">
                    ※ 사용자번호는 테스트 용으로 사용되며 싸피 금융망 사용자 번호와 일치하지 않아도 괜찮습니다. 
                </Link>
            </div>
        </div>
    )
}
