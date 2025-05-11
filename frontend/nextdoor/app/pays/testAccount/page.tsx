"use client"

import Header from "@/components/pays/common/Header";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { CreateFinUserRequest, GetAddedListRequest } from "@/lib/api/pays";
import { CreateFinUserRequestDto } from "@/types/pays/request";
import Button from "@/components/pays/common/Button";
import { CreateFinUserResponseDto, AddAccountResponseDto } from "@/types/pays/response";
import useUserStore from "@/lib/store/useUserStore";
import { useRouter } from "next/navigation";

export default function TestPage() {
    const router = useRouter();
    const { setUserKey, setBillyAccount, setAddedAccounts } = useUserStore();

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
            <Header txt="테스트 계좌 등록" />
            <div className="flex-1 overflow-y-auto flex flex-col gap-3 p-4">
                <div className="text-xl text-blue400 font-bold">임의의 이메일과 번호 등록시</div>
                <div className="text-xl text-blue400 font-bold mb-10">계좌 등록 테스트 가능</div>
                <FormProvider {...form}>
                        <Controller
                            control={form.control}
                            name="userId"
                            render={({ field }) => 
                                <input 
                                    required
                                    type="text"
                                    placeholder="사용자 아이디 번호"
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
