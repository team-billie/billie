import axiosInstance from "@/lib/api/instance";

interface ReservationActionBtnProps {
  status: "update" | "cancel" | "confirm";
  rentalId: number; // 예약 식별자 필요
  onSuccess?: () => void; // 요청 성공 후 콜백
}

export default function ReservationActionBtn({
  status,
  rentalId,
  onSuccess,
}: ReservationActionBtnProps) {
  const getLabel = (status: ReservationActionBtnProps["status"]) => {
    switch (status) {
      case "update":
        return "수정";
      case "confirm":
        return "확정";
      case "cancel":
        return "취소";
      default:
        return "";
    }
  };

  const handleClick = async () => {
    try {
      switch (status) {
        // case "update":
        //   await axiosInstance.patch(`/api/v1/reservations/${reservationId}`, {
        //     status: "updated",
        //   });
        //   break;
        case "confirm":
          await axiosInstance.patch(`/api/v1/reservations/${rentalId}/status`, {
            status: "CONFIRMED",
          });
          break;
        case "cancel":
          await axiosInstance.delete(`/api/v1/reservations/${rentalId}`);
          break;
      }
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("예약 요청 실패:", error);
      alert("요청 처리 중 문제가 발생했습니다.");
    }
  };

  return (
    <div
      className="flex-1 py-2 hover:bg-gray-100 cursor-pointer text-center"
      onClick={handleClick}
    >
      {getLabel(status)}
    </div>
  );
}
