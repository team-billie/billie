"use-client"

import { Metadata } from "next";
import { GetPostListRequest } from "@/lib/api/posts";
import { useEffect, useState } from "react";


export function generateMetadata(): Metadata {
  return {
    title: "Home",
    description: "홈페이지입니다",
  };
}

export default function HomePage() {
  const [postList, setPostList] = useState<PostListResponseDto[]>([]);
  useEffect(() => {
    GetPostListRequest("1").then((res) => {
      setPostList(res);
    });
  }, []);
  return (
    <main className="p-24">
      <h1 className="text-4xl font-bold">Home</h1>
    </main>
  );
}
