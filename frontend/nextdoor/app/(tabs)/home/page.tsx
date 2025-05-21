import { Metadata } from "next";
import PostList from "@/components/(tabs)/home/PostList";
import CreatePost from "@/components/(tabs)/home/CreatePost";
import { LocationEdit, Search, MapPin } from "lucide-react";
import Link from "next/link";
import Category from "@/components/(tabs)/home/Category";
export function generateMetadata(): Metadata {
  return {
    title: "Home",
    description: "홈페이지입니다",
  };
}

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <div className="sticky top-0 z-10 flex h-16 items-center justify-between px-4 text-gray900 bg-white">
        <div className="flex items-center gap-2">
          <LocationEdit className="w-6 h-6" />
          <h1 className="text-2xl">전국구</h1>
        </div>
        <Link href="/search">
          <Search className="w-6 h-6"/>
        </Link>
      </div>
      <main className="px-4 mb-20">
        {/* 배너 */}
        <div className="relative flex items-center gap-2 rounded-3xl overflow-hidden">
          <img src="/images/banner_6.png" alt="home_banner" />
          <div className="flex flex-col items-end gap-2 text-2xl font-bold text-white absolute bottom-0 right-0 p-5">
            <div className="flex flex-col items-end">
              <div>AI 안심 거래로</div>
              <div>손상 분쟁 없이 깔끔하게</div>
            </div>
            <div className="flex items-center gap-2 text-lg text-gray400 pb-2">
              AI 안심 거래 가이드 보러가기
            </div>
          </div>
        </div>

        {/* <div className="mt-5 text-2xl font-bold">전체 렌탈</div> */}


        {/* 게시글 목록 */}
        <PostList />
      </main>
      <div>
        <CreatePost />
      </div>
    </div>
  );
}
