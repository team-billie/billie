"use client"

import Header from "@/components/pays/common/Header";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { CreateFinUserRequest, GetAddedListRequest } from "@/lib/api/pays";
import { CreateFinUserRequestDto } from "@/types/pays/request";
import Button from "@/components/pays/common/Button";
import { CreateFinUserResponseDto, AddAccountResponseDto } from "@/types/pays/response";
import useUserStore from "@/lib/store/useUserStore";
import { useRouter } from "next/navigation";

export default function TestSignUpPage() {
    const router = useRouter();
    const { setUserKey, setBillyAccount, setAddedAccounts, setUserId } = useUserStore();

    const form = useForm<CreateFinUserRequestDto>({
        defaultValues: {
            userId: "",
            ssafyApiEmail: "",
        },
    });

    const onSubmit = (data: CreateFinUserRequestDto) => {
        CreateFinUserRequest(data).then((res: CreateFinUserResponseDto) => {
            console.log(res);
            setUserKey(res.userKey);
            setUserId(Number(data.userId));

            GetAddedListRequest(res.userKey).then((res: AddAccountResponseDto[]) => {
                console.log(res[0]);
                setBillyAccount(res[0]);
            });
            alert("계좌 등록 성공");
            router.push("/profile");

        }).catch((error) => {
            alert("계좌 등록 실패");
        });
    }

    
    return (
        <div className="flex flex-col gap-3">
            <Header txt="테스트 회원가입" />
            <div className="flex-1 overflow-y-auto flex flex-col gap-3 p-4">
                <div className="text-3xl text-blue400 font-extrabold mb-4">테스트 회원가입</div>
                <FormProvider {...form}>
                        <Controller
                            control={form.control}
                            name="userId"
                            render={({ field }) => 
                                <input 
                                    required
                                    type="number"
                                    placeholder="싸피 금융망에 사용될 사용자 번호"
                                    className="w-full border border-gray-500 rounded-md p-4"
                                    {...field} />}
                        />
                        <Controller
                            control={form.control}
                            name="ssafyApiEmail"
                            render={({ field }) => 
                                <input 
                                    required
                                    type="text"
                                    placeholder="사용자 이메일"
                                    className="w-full border border-gray-500 rounded-md p-4"
                                    {...field} />}     
                        />
                        <Button txt="등록" state={true} type="submit" onClick={form.handleSubmit(onSubmit)} />
                </FormProvider>
            </div>
        </div>
    )
}
