import ProductPhotos from "@/components/posts/detail/ProductPhotos";
import { useParams } from "next/navigation";
import PhotoBox from "./PhotoBox";

interface AllPhotosProps {
  afterPhotos: string[] | null;
  beforePhotos: string[] | null;
}

export default function AllPhotos({
  afterPhotos,
  beforePhotos,
}: AllPhotosProps) {
  console.log("afterPhotos", afterPhotos);
  return (
    <div className="p-5 w-full flex flex-col justify-between">
      <div className="font-bold text-2xl text-white mb-2  ">전체 사진 확인</div>
      <div className="flex w-full  ">
        {beforePhotos && <PhotoBox images={beforePhotos} status="before" />}
        {afterPhotos && <PhotoBox images={afterPhotos} status="after" />}
      </div>
    </div>
  );
}
