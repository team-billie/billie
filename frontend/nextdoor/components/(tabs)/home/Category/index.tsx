"use client";

import { useState } from "react";


// 객체 리스트로  만들어줘
const CATEGORY = [
    {
        name: "전체",
        value: "ALL"
    },
    {
        name: "디지털기기",
        value: "DIGITAL_DEVICE"
    },
    {
        name: "생활가전",
        value: "HOME_APPLIANCE"
    },
    {
        name: "가구/인테리어",
        value: "FURNITURE_INTERIOR"
    },
    {
        name: "유아도서",
        value: "BABY_BOOK"
    },
    {
        name: "여성의류",
        value: "WOMEN_CLOTHING"
    },
    {
        name: "여성잡화",
        value: "WOMEN_ACCESSORIES"
    },
    {
        name: "남성패션/잡화",
        value: "MEN_FASHION_ACCESSORIES"
    },
    {
        name: "뷰티/미용",
        value: "BEAUTY"
    },
    {
        name: "스포츠/레저",
        value: "SPORTS_LEISURE"
    },
    {
        name: "취미/게임/음반",
        value: "HOBBY_GAMES_MUSIC"
    },
    {
        name: "도서",
        value: "BOOK"
    },
    {
        name: "티켓/교환권",
        value: "TICKET_VOUCHER"
    },
    {
        name: "가공식품",
        value: "PROCESSED_FOOD"
    },
    {
        name: "건강기능식품",
        value: "HEALTH_SUPPLEMENT"
    },
    {
        name: "기타 중고물품",
        value: "ETC_USED_GOODS"
    }
]

export default function Category() {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORY[0]);

  return (
    <div 
        className="sticky top-[52px] z-10 bg-white flex overflow-x-auto hide-scrollbar items-center py-3"
        style={{
            scrollbarWidth: "none",        // Firefox
            msOverflowStyle: "none",       // IE 10+
        }}
        >
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      {CATEGORY.map((category) => (
        <div
          key={category.value}
          className={`flex-shrink-0 text-gray900 px-3 py-1 rounded-full ${selectedCategory.value === category.value ? "bg-blue400 text-white" : ""}`}
          onClick={() => setSelectedCategory(category)}
        >
          {category.name}
        </div>
      ))}
    </div>
  );
}
