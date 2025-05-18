"use client";
import Header from "@/components/pays/common/Header";
import DetailCard from "@/components/reservations/DetailCard";
import { GetReservationDetailRequest } from "@/lib/api/rental/request";
import { GetReservationDetailRequestDTO } from "@/types/rental/request";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReservationDetailPage() {
  const [reservation, setReservation] =
    useState<GetReservationDetailRequestDTO | null>(null);
  const { id } = useParams();
  const [date, setDate] = useState(0);

  const fetchReservationDetail = async () => {
    const data = await GetReservationDetailRequest(Number(id));
    setReservation(data);
  };

  useEffect(() => {
    if (id) {
      fetchReservationDetail();
    }
  }, [id]);

  useEffect(() => {
    if (reservation) {
      const start = new Date(reservation.startDate);
      const end = new Date(reservation.endDate);
      const diffDays =
        Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) +
        1;
      setDate(diffDays);
    }
  }, [reservation]);

  console.log("❤️", reservation);
  return (
    <main className="flex flex-col">
      <div>
        <Header txt="거래 상세" x={true} />
      </div>
      <div className="p-2">
        {reservation && (
          <DetailCard
            title={reservation.title}
            img={reservation?.productImageUrls}
            cost={reservation.rentalFee}
            endDate={reservation.endDate}
            startDate={reservation.startDate}
            deposit={reservation.deposit}
            date={date}
          />
        )}
      </div>
      <div className="flex flex-col m-4 gap-6"></div>
    </main>
  );
}
