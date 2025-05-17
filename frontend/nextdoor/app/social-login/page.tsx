"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getUserInfo } from "@/lib/api/auth";
import useUserStore from "@/lib/store/useUserStore";
import { GetUserInfoResponse } from "@/types/auth/response";


export default function OAuthRedirectPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const setUserKey = useUserStore((state) => state.setUserKey);

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const userKey = searchParams.get("userKey");
    const uuid = searchParams.get("uuid");

    if (accessToken && userKey) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userKey", userKey);
      localStorage.setItem("uuid", uuid || "");

      getUserInfo().then((res: GetUserInfoResponse) => {
        console.log(res);
        setUserKey(userKey);
        setUser(res);
      });
      router.push("/home");
    } else {
      console.error("Access token not found");
      router.push("/login");
    }
  }, [searchParams, router]);

  return <div>로그인 중입니다...</div>;
}
