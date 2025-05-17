import { useParams } from "next/navigation";

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
    <div className="flex flex-col p-5">
      <div className="font-bold text-2xl text-white mb-2 ">전체 사진 확인</div>
      <div className="h-screen flex flex-col items-center gap-4 py-6"></div>
    </div>
  );
}
