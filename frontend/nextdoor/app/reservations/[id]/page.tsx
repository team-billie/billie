"use client";
import Header from "@/components/pays/common/Header";
import DetailCard from "@/components/reservations/DetailCard";
import axiosInstance from "@/lib/api/instance";
import { GetReservationDetailRequest } from "@/lib/api/rental/request";
import { useAlertStore } from "@/lib/store/useAlertStore";
import { GetReservationDetailRequestDTO } from "@/types/rental/request";
import { useParams, useRouter } from "next/navigation";
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

  const router = useRouter();

  const { showAlert } = useAlertStore();
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
  const handleDelete = () => {
    try {
      axiosInstance.delete(`/api/v1/rentals/${id}`);
      showAlert("거래 취소를 성공하셨습니다.", "success");
      router.push("/reservations");
      return;
    } catch (err) {
      console.log(err);
      showAlert("거래 취소를 실패샜습니다.", "error");
    }
  };

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
      <div
        className="fixed bottom-6 right-6 bg-gray200 border py-3 flex items-center justify-center rounded-xl w-1/2"
        onClick={() => handleDelete()}
      >
        거래 취소
      </div>
    </main>
  );
}
