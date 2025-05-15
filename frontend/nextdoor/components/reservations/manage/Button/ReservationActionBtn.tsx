import axiosInstance from "@/lib/api/instance";
import useAlertModal from "@/lib/hooks/alert/useAlertModal";
import useUserStore from "@/lib/store/useUserStore";
import { useRouter } from "next/navigation";

interface ReservationBtnProps {
  status: "update" | "cancel" | "confirm";
  reservationId: number; // 예약 식별자 필요
  onSuccess?: () => void; // 요청 성공 후 콜백
}
export default function ReservationActionBtn({
  status,
  reservationId,
  onSuccess,
}: ReservationBtnProps) {
  const { userId } = useUserStore();
  const { showAlert } = useAlertModal(); // ✅ 모달 훅 사용
  const router = useRouter();
  const getLabel = (status: ReservationBtnProps["status"]) => {
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
    console.log("❤️❤️❤️", reservationId, "user", userId);

    try {
      switch (status) {
        // case "update":
        //   await axiosInstance.patch(`/api/v1/reservations/${reservationId}`, {
        //     status: "updated",
        //   });
        //   break;
        case "confirm":
          await axiosInstance.patch(
            `/api/v1/reservations/${reservationId}/status`,
            {
              status: "CONFIRMED",
            },
            {
              headers: {
                "Content-Type": "application/json",
                "X-User-Id": userId,
              },
            }
          );
          showAlert("예약 확정", "예약이 확정되었습니다.", "success");
          router.push("/reservations/lend");

          break;
        case "cancel":
          await axiosInstance.delete(`/api/v1/reservations/${reservationId}`, {
            headers: {
              "Content-Type": "application/json",
              "X-User-Id": userId,
            },
          });
          showAlert("예약 취소", "예약이 성공적으로 취소되었습니다.", "info");
          break;
      }
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("예약 요청 실패:", error);
      showAlert("오류 발생", "요청 처리 중 문제가 발생했습니다.", "error");
      onSuccess?.(); // ✅ 성공 시 부모에게 알리기
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
