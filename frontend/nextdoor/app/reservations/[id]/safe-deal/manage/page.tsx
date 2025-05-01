import PhotoManager from "@/components/reservations/safe-deal/manage/PhotoManager";

export default function SafeDealManage() {
  return (
    <main>
      <div className="h-screen flex flex-col p-4">
        <div>
          <PhotoManager status="대여 물품 사진" />
          <PhotoManager status="반납 물품 사진" />
          <button className="btn w-full mx-2 h-14 bg-gradient-to-r from-blue200 to-blue400 text-white">
            AI 분석 결과 확인
          </button>
        </div>
      </div>
    </main>
  );
}
