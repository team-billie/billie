import { Heart, DollarSign } from "lucide-react";

export default function PostIistItem() {
    return (
        <div className="grid grid-cols-[1fr_3fr] gap-4">
            {/* //이미지 사진 */}
            <div className=" h-32 bg-gray-200 rounded-md">img</div>
            <div className=" flex flex-col gap-1 flex-1">
                <div className="flex justify-between">
                    <div className="text-xl font-bold">다이슨 헤어 드라이기</div>
                    <Heart />
                </div>
                <div className="flex gap-2">
                    <div className="flex gap-[6px] items-center text-blue400 border border-blue400 rounded-md px-1 ">
                        <Heart className="w-4 h-4" />
                        <div>5</div>
                    </div>
                    <div className="flex gap-[3px] items-center text-sm text-blue400 border border-blue400 rounded-md px-1 py-[2px]">
                        <DollarSign className="w-4 h-4" />
                        <div>5</div>
                    </div>
                </div>
                <div className="flex-1 flex flex-col justify-end">
                    <div className="flex gap-1 items-end">
                        <div className="text-sm mb-[2px] mr-2">대여료</div>
                        <div className="font-bold text-xl">20000원</div>
                        <div className="text-sm mb-[2px]">/일</div>
                    </div>
                    <div className="flex gap-1 items-end">
                        <div className="text-sm mb-[2px] mr-2">보증금</div>
                        <div className="font-bold text-xl">20000원</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
