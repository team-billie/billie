"use client";

import MainHeader from "@/components/common/Header/ReservationHeader";
import LendCard from "@/components/reservations/RentalCard/LendCard";
import RentalPeriod from "@/components/reservations/RentalCard/RentalPeriod";
import ReservationStatusTabs from "@/components/reservations/safe-deal/overview/ReservationStatusTabs";

import Image from "next/image";

export default function ReservationPage() {
  const items = [
    {
      img: "https://picsum.photos/seed/picsum/200/300",
      title: "다이슨 헤어 드라이기",
      cost: 10000,
      date: 3,
      startDate: "2025-05-05",
      endDate: "2025-05-10",
    },
    {
      img: "https://picsum.photos/seed/picsum/200/300",
      title: "에어팟 맥스",
      cost: 20000,
      date: 3,
      startDate: "2025-05-05",
      endDate: "2025-05-10",
    },
  ];

  return (
    // <main>
    //   <MainHeader title="Reservations" />
    //   <ReservationStatusTabs />
    //   <div className="h-screen overflow-y-auto p-4 flex flex-col gap-6">
    //     {items.map((item) => (
    //       <div
    //         key={item.title}
    //         className="w-full border rounded-lg p-4 gap-4 flex flex-col"
    //       >
    //         <RentalPeriod startDate={item.startDate} endDate={item.endDate} />
    //         <div className="flex gap-4">
    //           <div className="w-24 h-24 relative flex-shrink-0 rounded-md overflow-hidden">
    //             <Image
    //               src={item.img}
    //               alt={item.title}
    //               fill
    //               className="object-cover"
    //             />
    //           </div>
    //           <div className="flex flex-col justify-between flex-grow">
    //             <div>
    //               <div className="text-lg font-semibold">{item.title}</div>
    //               <div className="text-sm text-gray-600">
    //                 {item.cost.toLocaleString()} won / {item.date}일
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         {/* 상태 바 */}
    //         <div className=" text-m text-blue400 font-bold">안심대여중</div>
    //       </div>
    //     ))}
    //   </div>
    // </main>
    <main>
      <MainHeader title="Reservations" />
      <ReservationStatusTabs />
      <div className="h-screen overflow-y-auto p-4 flex flex-col gap-6">
        {items.map((item) => (
          <div key={item.title}>
            <LendCard
              title={item.title}
              img={item.img}
              cost={item.cost}
              date={item.date}
              startDate={item.startDate}
              endDate={item.endDate}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
