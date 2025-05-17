"use client"

import RecentSearchItem from "@/components/search/RecentSearchItem";
import SearchHeader from "@/components/search/SearchHeader";
import { useRouter } from "next/navigation";
import { useState } from "react";

type RecentSearchItem = {
    id: number;
    searchValue: string;
}

const dummyData: RecentSearchItem[] = [
    {
        id: 1,
        searchValue: "최근 검색어1",
    },
    {
        id: 2,
        searchValue: "최근 검색어2",
    },
    {
        id: 3,
        searchValue: "최근 검색어3",
    },
]

export default function SearchPage() {
    const router = useRouter();
    const [searchValue, setSearchValue] = useState("");
    const handleSearch = (value: string) => {
        router.push(`/search/${value}`);
    }

    const [recentSearchList, setRecentSearchList] = useState<RecentSearchItem[]>(dummyData);

    return (
        <div>
            <SearchHeader handleSearch={handleSearch} searchValue={searchValue} setSearchValue={setSearchValue}/>
            <div className="px-4 py-2">
                <div className="flex justify-between items-center">
                    <div className="text-gray700 font-bold text-lg">
                        최근 검색어
                    </div>
                    <div className="text-gray500 font-bold text-sm">
                        전체 삭제
                    </div>
                </div>
                <div className="py-2">
                    {recentSearchList.map((item) => (
                        <RecentSearchItem key={item.id} searchValue={item.searchValue} />
                    ))}
                </div>
            </div>
        </div>
    )
}