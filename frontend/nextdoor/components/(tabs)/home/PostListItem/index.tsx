import { Heart, DollarSign } from "lucide-react";
import { PostListItemDto } from "@/types/posts/response";
import { useState } from "react";
import { formatNumberWithCommas } from "@/lib/utils/money";
import { PostLikeRequest, PostLikeDeleteRequest } from "@/lib/api/posts";

interface PostListItemProps {
  post: PostListItemDto;
}

export default function PostListItem({ post }: PostListItemProps) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeBtn = () => {
    if (isLiked) {
      PostLikeDeleteRequest(post.postId.toString());
    } else {
      PostLikeRequest(post.postId.toString());
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="grid grid-cols-[1fr_3fr] gap-4 border-b border-gray-200 pb-4">
      {/* //이미지 사진 */}
      <img
        src="/images/default/post_default.png"
        className="h-32 bg-gray-200 rounded-2xl"
      />
      <div className=" flex flex-col gap-1 flex-1">
        <div className="flex justify-between">
          <div className="text-xl font-bold">{post.title}</div>
          <Heart
            className={`cursor-pointer transition-colors ${isLiked ? "text-pink-500 fill-pink-300" : "text-gray600"
              }`}
            onClick={(e) => {
              e.preventDefault();
              handleLikeBtn();
            }}
          />
        </div>
        <div className="flex gap-2">
          <div className="flex gap-[6px] items-center text-blue400 border border-blue400 rounded-md px-1 ">
            <Heart className="w-4 h-4" />
            <div>{post.likeCount}</div>
          </div>
          <div className="flex gap-[3px] items-center text-sm text-blue400 border border-blue400 rounded-md px-1 py-[2px]">
            <DollarSign className="w-4 h-4" />
            <div>{post.dealCount}</div>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-end">
          <div className="flex gap-1 items-end">
            <div className="text-sm mb-[2px] mr-2">대여료</div>
            <div className="font-bold text-xl">
              {formatNumberWithCommas(post.rentalFee)}원
            </div>
            <div className="text-sm mb-[2px]">/일</div>
          </div>
          <div className="flex gap-1 items-end">
            <div className="text-sm mb-[2px] mr-2">보증금</div>
            <div className="font-bold text-xl">
              {formatNumberWithCommas(post.deposit)}원
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
