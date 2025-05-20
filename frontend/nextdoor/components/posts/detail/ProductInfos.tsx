// "use client";

// import { Heart } from "lucide-react";
// import ProductPrice from "./ProductPrice";
// import ProductDescription from "./ProductDescription";
// import ProductLocation from "./ProductLocation";

// export interface ProductInfosProps {
//   title: string;
//   content: string;
//   rentalFee: number;
//   deposit: number;
//   address: string;
//   category: string;
//   nickname: string;
// }

// export default function ProductInfos({
//   title,
//   content,
//   rentalFee,
//   deposit,
//   address,
//   category,
//   nickname,
// }: ProductInfosProps) {
//   return (
//     <div className="w-full h-full p-3">
//       <div className="py-2">
//         <div className="text-2xl ">{title}</div>
//         {/* 관심/거래 */}
//         {/* <div className="flex float-end gap-2 p-2 text-white">
//           <div className="bg-blue400 pr-2 flex gap-2">
//             <Heart className="p-1" />
//             관심 등록 수 5
//           </div>
//           <div className="bg-blue400 px-2 flex gap-2">$ 총 거래 횟수 5</div>
//         </div> */}
//       </div>
//       {/* 상품 가격 */}
//       <ProductPrice deposit={deposit} rentalFee={rentalFee} />
//       {/* 설명 */}
//       <ProductDescription content={content} />
//       {/* 위치 */}
//       <ProductLocation address={address} />
//       {/* 판매자 정보 */}
//       <div className="flex">
//         <div className="flex gap-3">
//           <img src={`/images/profileimg.png`} className="w-12 h-12 m-auto rounded-full  bg-gray600"></img>
//           <div>
//             <div className="text-lg">{nickname}</div>
//             <div className="text-gray600">판매 경력 1년</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { Heart, MapPin } from "lucide-react";
import ProductPrice from "./ProductPrice";
import ProductDescription from "./ProductDescription";
import ProductLocation from "./ProductLocation";
import useUserStore from "@/lib/store/useUserStore";

export interface ProductInfosProps {
  title: string;
  content: string;
  rentalFee: number;
  deposit: number;
  address: string;
  category: string;
  nickname: string;
}

export default function ProductInfos({
  title,
  content,
  rentalFee,
  deposit,
  address,
  category,
  nickname,
}: ProductInfosProps) {
  // 사용자 정보 상태 추가
  const [userInfo, setUserInfo] = useState({
    profileImage: "/images/profileimg.png",
    experience: "판매 경력 1년",
  });
  
  // 현재 로그인한 사용자 정보
  const { userId } = useUserStore();

  // 컴포넌트 마운트 시 사용자 정보 불러오기
  useEffect(() => {
    // 사용자 정보를 불러오는 API 호출 (예시)
    async function fetchUserInfo() {
      try {
        // 실제로는 API 호출을 통해 사용자 정보를 가져와야 합니다
        // const response = await getUserInfo(nickname);
        // setUserInfo(response);
        
        // 지금은 더미 데이터로 대체
        setUserInfo({
          profileImage: "/images/profileimg.png",
          experience: "판매 경력 1년",
        });
      } catch (error) {
        console.error("사용자 정보 로딩 실패:", error);
      }
    }
    
    fetchUserInfo();
  }, [nickname]);

  return (
    <div className="w-full h-full p-0" >
       <div className=" bg-white rounded-bl-3xl p-4 shadow-sm" >
      {/* 제목 - 별도 행에 배치하여 충분한 공간 확보 */}
      <div className="mb-2 mx-2 mt-4">
        <h1 className="text-2xl font-bold break-words">{title}</h1>
      </div>
      
      {/* 위치 정보 줄 */}
      <div className="flex items-center mb-4 mx-2">
        <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
        <span className="text-sm text-gray-500">{address}</span>
      </div>
      
      <div className="flex justify-end mb-1 mx-2">
        <div className="flex items-center">
          <div className="text-xs text-gray-500 mr-1">작성자</div>
          <div className="text-blue-500 text-sm font-medium mr-1">{nickname}</div>
          <img src={userInfo.profileImage} className="w-8 h-8 rounded-full bg-gray-300" alt="프로필 이미지" />
        </div>
      </div>
     {/* 가격 정보 - 양쪽 여백 추가 */}
     <div className="border-t border-b border-gray-100 p-5 mx-8">
        <div className="flex justify-between">
          <div>
            <div className="text-sm text-gray-500">일 대여료</div>
            <div className="text-blue-500 text-2xl font-bold">₩ {rentalFee.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">보증금</div>
            <div className="text-gray-900 text-2xl font-bold">₩ {deposit.toLocaleString()}</div>
          </div>
        </div>
      </div>
      
    
      </div>
      {/* 설명 */}
      
      {/* 위치 */}
      {/* <ProductLocation address={address} /> */}
      
      <ProductDescription content={content} />
    </div>
  );
}
