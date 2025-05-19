"use client"

import RecentSearchItem from "@/components/search/RecentSearchItem";
import SearchHeader from "@/components/search/SearchHeader";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getSuggestions } from "@/lib/api/posts";

type RecentSearchItem = {
    id: number;
    searchValue: string;
}

export default function SearchPage() {
    const router = useRouter();
    const [searchValue, setSearchValue] = useState("");
    // 로컬 스토리지에서 최근 검색어를 로드
    const [recentSearchList, setRecentSearchList] = useState<RecentSearchItem[]>([]);

    // 페이지 로드 시 localStorage에서 최근 검색어 가져오기
    useEffect(() => {
        const savedSearches = localStorage.getItem('recentSearches');
        if (savedSearches) {
            try {
                setRecentSearchList(JSON.parse(savedSearches));
            } catch (e) {
                console.error('최근 검색어 로드 실패:', e);
                setRecentSearchList([]);
            }
        }
    }, []);

    const handleSearch = (value: string) => {
        if (!value.trim()) return;

        // 새 검색어를 로컬 스토리지에 저장
        const newSearch = {
            id: Date.now(),
            searchValue: value,
        };

        const updatedSearches = [newSearch, ...recentSearchList.filter(item => item.searchValue !== value)].slice(0, 10);
        setRecentSearchList(updatedSearches);
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));

        router.push(`/search/${value}`);
    }

    const clearAllSearches = () => {
        setRecentSearchList([]);
        localStorage.removeItem('recentSearches');
    }

    const removeSearchItem = (id: number) => {
        const updatedSearches = recentSearchList.filter(item => item.id !== id);
        setRecentSearchList(updatedSearches);
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    }

    return (
        <div>
            <SearchHeader handleSearch={handleSearch} searchValue={searchValue} setSearchValue={setSearchValue}/>
            <div className="px-4 py-2">
                <div className="flex justify-between items-center">
                    <div className="text-gray700 font-bold text-lg">
                        최근 검색어
                    </div>
                    {recentSearchList.length > 0 && (
                        <button 
                            className="text-gray500 font-bold text-sm"
                            onClick={clearAllSearches}
                        >
                            전체 삭제
                        </button>
                    )}
                </div>
                <div className="py-2">
                    {recentSearchList.length > 0 ? (
                        recentSearchList.map((item) => (
                            <RecentSearchItem 
                                key={item.id} 
                                searchValue={item.searchValue} 
                                onDelete={() => removeSearchItem(item.id)}
                                onSelect={() => handleSearch(item.searchValue)}
                            />
                        ))
                    ) : (
                        <div className="py-4 text-center text-gray500">
                            최근 검색어가 없습니다.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}