"use client"

import { ChevronLeft, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { getSuggestions } from "@/lib/api/posts";
import { useDebounce } from "@/lib/hooks/useDebounce";

interface SearchHeaderProps {
    searchValue: string;
    setSearchValue: (value: string) => void;
    handleSearch: (value: string) => void;
}

export default function SearchHeader({ searchValue, setSearchValue, handleSearch }: SearchHeaderProps) {
    const router = useRouter();
    const [isSearching, setIsSearching] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const debouncedSearchTerm = useDebounce(searchValue, 300);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (debouncedSearchTerm.length > 0) {
                try {
                    const result = await getSuggestions(debouncedSearchTerm);
                    setSuggestions(result);
                    setShowSuggestions(true);
                } catch (error) {
                    console.error("자동완성 로드 실패:", error);
                    setSuggestions([]);
                    setShowSuggestions(false);
                }
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        };

        fetchSuggestions();
    }, [debouncedSearchTerm]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSuggestionClick = (suggestion: string) => {
        setSearchValue(suggestion);
        handleSearch(suggestion);
        setShowSuggestions(false);
    };

    return (
        <form 
            className="flex h-20 items-center justify-between pr-4 pl-2 gap-2" 
            onSubmit={(e)=>{
                e.preventDefault();
                handleSearch(searchValue);
                setShowSuggestions(false);
            }}>
            <ChevronLeft className="w-7 h-7 text-gray700" onClick={() => router.back()}/>
            <div className="flex-1 search-input-container relative" ref={searchRef}>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray600"/>
                <input 
                    onChange={(e) => {
                        if (e.target.value.length > 0) {
                            setIsSearching(true);
                        } else {
                            setIsSearching(false);
                        }
                        setSearchValue(e.target.value);
                        setShowSuggestions(e.target.value.length > 0);
                    }}
                    onFocus={() => {
                        if (searchValue.length > 0) {
                            setShowSuggestions(true);
                        }
                    }}
                    value={searchValue}
                    type="text" 
                    placeholder="검색어를 입력해주세요" 
                    className={`w-full rounded-lg border-2 border-gray200 placeholder:text-gray500 focus:border-gray100 focus:outline-none focus:ring-0 p-3 px-10 text-gray900 font-bold text-lg ${isSearching ? "bg-gray100" : "bg-white"}`}/>
                {searchValue.length > 0 && <X className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray600" onClick={() => {
                    setSearchValue("");
                    setShowSuggestions(false);
                }}/>}
                
                {/* 자동완성 제안 UI */}
                {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray200 shadow-lg rounded-lg z-50 max-h-60 overflow-y-auto">
                        {suggestions.map((suggestion, index) => (
                            <div
                                key={index}
                                className="px-4 py-3 hover:bg-gray100 cursor-pointer flex items-center"
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                <Search className="mr-3 w-4 h-4 text-gray500" />
                                <span className="text-gray900">{suggestion}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </form>
    )
}