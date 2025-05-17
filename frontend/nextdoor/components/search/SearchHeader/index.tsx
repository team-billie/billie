"use client"

import { ChevronLeft, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SearchHeaderProps {
    searchValue: string;
    setSearchValue: (value: string) => void;
    handleSearch: (value: string) => void;
}

export default function SearchHeader({ searchValue, setSearchValue, handleSearch }: SearchHeaderProps) {
    const router = useRouter();
    const [isSearching, setIsSearching] = useState(false);

    return (
        <form 
            className="flex h-20 items-center justify-between pr-4 pl-2  gap-2" 
            onSubmit={(e)=>{
                e.preventDefault();
                handleSearch(searchValue);
            }}>
            <ChevronLeft className="w-7 h-7 text-gray700" onClick={() => router.back()}/>
            <div className="flex-1 search-input-container relative" >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray600"/>
            <input 
                onChange={(e) => {
                    if (e.target.value.length > 0) {
                        setIsSearching(true);
                    } else {
                        setIsSearching(false);
                    }
                    setSearchValue(e.target.value);
                }}
                value={searchValue}
                type="text" 
                placeholder="검색어를 입력해주세요" 
                className={`w-full rounded-lg border-2 border-gray200 placeholder:text-gray500 focus:border-gray100 focus:outline-none focus:ring-0 p-3 px-10 text-gray900 font-bold text-lg ${isSearching ? "bg-gray100" : "bg-white"}`}/>
            {searchValue.length > 0 && <X className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray600" onClick={() => setSearchValue("")}/>}
            </div>
        </form>
    )
}