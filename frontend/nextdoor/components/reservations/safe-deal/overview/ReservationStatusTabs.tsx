import Link from "next/link";

export default function ReservationStatusTabs() {
  return (
    <div className="flex-1 w-full flex justify-between p-4 rounded-s-3xl border-t-2 -mt-12 bg-white ">
      <div className="flex gap-3">
        <Link href="/reservations">
          <button className="btn-1">전체</button>
        </Link>
        <button className="btn-1">거래중</button>
        <button className="btn-1">완료</button>
      </div>
      <Link href="/reservations/manage">
        <div className="btn-1 border-blue400 text-blue400">예약관리</div>
      </Link>
    </div>
  );
}
