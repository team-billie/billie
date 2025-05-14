"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import SearchMap, { SearchMapRef } from "@/components/(auth)/SearchMap";

export default function LocationSelectPage() {
    const searchMapRef = useRef<SearchMapRef>(null);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [selectedAddress, setSelectedAddress] = useState<string>("");
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const router = useRouter();

    const handleMoveToCurrentLocation = () => {
        searchMapRef.current?.moveToCurrentLocation();
    };

    useEffect(() => {
        if (!query) {
            setSuggestions([]);
            return;
        }

        const service = new window.google.maps.places.AutocompleteService();
        service.getPlacePredictions(
            { input: query, componentRestrictions: { country: "kr" } },
            (predictions) => {
                if (predictions) {
                    // 동, 읍, 면으로 끝나는 단어가 있는 주소만 필터링
                    const filteredResults = predictions
                        .map((p) => p.description)
                        .filter((desc) => {
                            // 주소를 공백으로 분리
                            const parts = desc.split(' ');
                            // 어느 부분이라도 동/읍/면으로 끝나는 단어가 있으면 포함
                            return parts.some(part => /(동|읍|면)$/.test(part));
                        });

                    // 중복 제거: 같은 동/읍/면은 하나만 표시
                    const uniqueAddresses = removeDuplicateDistricts(filteredResults);
                    setSuggestions(uniqueAddresses);
                }
            }
        );
    }, [query]);

    // 같은 동/읍/면 중복 제거 함수
    const removeDuplicateDistricts = (addresses: string[]): string[] => {
        const districts = new Set();
        const uniqueAddresses: string[] = [];

        addresses.forEach(address => {
            const formattedAddress = formatAddress(address);
            const districtKey = extractDistrictKey(formattedAddress);

            // 동/읍/면이 있는 주소만 포함 (districtKey가 빈 문자열이 아닌 경우)
            if (districtKey && !districts.has(districtKey)) {
                districts.add(districtKey);
                uniqueAddresses.push(address);
            }
        });

        return uniqueAddresses;
    };

    // 동/읍/면을 포함한 고유 키 추출
    const extractDistrictKey = (address: string): string => {
        const parts = address.split(' ');
        // 동/읍/면으로 끝나는 단어 찾기
        const districtIndex = parts.findIndex(part => /(동|읍|면)$/.test(part));

        if (districtIndex !== -1) {
            return parts.slice(0, districtIndex + 1).join(' ');
        }

        return ''; // 동/읍/면이 없는 경우 빈 문자열 반환 (중복 제거에서 제외됨)
    };

    const handleSelectSuggestion = (address: string) => {
        // setQuery(address);
        // setSuggestions([]);
        setSelectedAddress(address);
        setShowPopup(true);

        // 지도 이동
        searchMapRef.current?.moveToAddress(address);

        // SearchMap에 알림
        searchMapRef.current?.triggerAddressSelect(address);

        // 3초 후 팝업 숨기기
        setTimeout(() => setShowPopup(false), 3000);
    };

    // 위치 선택 완료 처리
    const handleSelectLocation = () => {
        if (selectedAddress) {
            // 이전 페이지로 선택된 위치 전달
            localStorage.setItem('selectedLocation', selectedAddress);
            router.back();
        } else {
            alert('위치를 선택해주세요.');
        }
    };

    const formatAddress = (fullAddress: string): string => {
        // 1. '대한민국' 제거
        let result = fullAddress.replace(/^대한민국\s*/, '');

        // 2. 시/군/구/동 등 필요한 부분 추출
        const parts = result.split(' ');

        // 동/읍/면으로 끝나는 단어까지만 자르기
        const districtIndex = parts.findIndex((part) =>
            /(동|읍|면)$/.test(part)
        );

        if (districtIndex !== -1) {
            return parts.slice(0, districtIndex + 1).join(' '); // ex: 부산광역시 강서구 녹산동
        }

        return ''; // 동/읍/면이 없는 경우 빈 문자열 반환
    };

    return (
        <div className="flex flex-col h-screen">
            {/* 헤더 */}
            <div className="bg-blue-500 text-white py-4 px-4 flex items-center">
                <button
                    onClick={() => router.back()}
                    className="mr-4"
                    aria-label="뒤로 가기"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 19L8 12L15 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg font-medium">내 동네 검색</h1>
            </div>

            {/* 지도 */}
            <div className="px-4 pt-4 rounded-xl overflow-hidden flex-1 relative">
                <SearchMap
                    ref={searchMapRef}
                    onAddressSelect={setSelectedAddress}
                />
            </div>

            {/* 검색 영역 */}
            <div className="flex flex-col gap-2 p-4">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="동 이름을 검색해 보세요."
                    className="w-full p-3 rounded-md border border-blue200"
                />

                <button
                    onClick={handleMoveToCurrentLocation}
                    className="w-full py-3 rounded-lg font-medium bg-blue400 text-white"
                >
                    현재 위치로 찾기
                </button>
                {/* 검색 결과 목록 */}
                <div className="min-h-[40dvh]">
                    {suggestions.length > 0 && (
                        <ul className="bg-white overflow-y-auto">
                            {suggestions.map((s, i) => (
                                <li
                                    key={i}
                                    onClick={() => handleSelectSuggestion(formatAddress(s))}
                                    className="p-2 hover:bg-blue100 cursor-pointer"
                                >
                                    {formatAddress(s)}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

            </div>



        </div>
    );
}