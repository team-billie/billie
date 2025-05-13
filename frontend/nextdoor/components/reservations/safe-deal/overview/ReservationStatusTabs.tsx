import Link from "next/link";

interface ReservationStatusTabsProps {
  selectedCondition: string;
  onChangeCondition: (condition: string) => void;
}

export default function ReservationStatusTabs({
  selectedCondition,
  onChangeCondition,
}: ReservationStatusTabsProps) {
  const conditions = [
    { label: "전체", value: "ALL" },
    { label: "거래중", value: "ACTIVE" },
    { label: "완료", value: "COMPLETED" },
  ];
  return (
    <div className="flex-1 w-full flex justify-between p-4 rounded-tl-3xl border-t-2 -mt-12 bg-white ">
      <div className="flex gap-3">
        {conditions.map(({ label, value }) => {
          const isActive = selectedCondition === value;
          const baseClasses = "btn-1";
          const activeClasses = "bg-blue300 text-white";
          const inactiveClasses = "bg-gray100";

          return (
            <button
              key={value}
              onClick={() => onChangeCondition(value)}
              className={`${baseClasses} ${
                isActive ? activeClasses : inactiveClasses
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
      <Link href="/reservations/manage">
        <div className="btn-1 border-blue400 text-blue400">예약관리</div>
      </Link>
    </div>
  );
}
