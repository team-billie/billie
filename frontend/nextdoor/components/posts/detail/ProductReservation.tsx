"use client";

export default function ProductReservation() {
  return (
    <div className="w-full h-full  flex justify-between p-3 bg-white">
      <div>
        <div>
          <span className="text-xl">₩ 20,000</span>
          <span> / 일 </span>
        </div>
        <div>
          <span>보증금</span>
          <span className="text-xl"> ₩ 100,000</span>
        </div>
      </div>
      <div className="bg-gradient-to-r from-blue400 to-blue300 text-white flex items-center px-10 rounded-full">
        예약하기
      </div>
    </div>
  );
}
