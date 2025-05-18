// lib/hooks/widget/useRentalWebSocket.ts
import { useState, useEffect, useCallback } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import useUserStore from "@/lib/store/useUserStore";
import {
  RentalProcess,
  RentalStatus,
  RENTAL_PROCESS,
  RENTAL_STATUS,
} from "@/types/rental/status";
import { fetchRentals } from "@/lib/api/rental/request";

// 렌탈 상태
export interface RentalStatusMessage {
  rentalId: number;
  process: RentalProcess;
  detailStatus: RentalStatus;
  rentalDetail?: {
    title: string;
    rentalId: number;
    charge: number;
    deposit: number;
    renterId: number;
    ownerId: number;
    productImageUrl: string;
    ownerProfileImageUrl: string;
    renterProfileImageUrl: string;
  };
}

// 훅 반환 타입
export interface UseRentalWebSocketReturn {
  activeRentals: RentalStatusMessage[];
  isConnected: boolean;
  loading: boolean;
  error: string | null;
  refreshRentals: () => Promise<void>;
}

export default function useRentalWebSocket(): UseRentalWebSocketReturn {
  const [activeRentals, setActiveRentals] = useState<RentalStatusMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { userId } = useUserStore();

  // 초기 대여 목록 가져오기 - api 호출
  const fetchRentalData = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    console.log("[대여-API] 렌탈 데이터 요청 시작 - userId:", userId);

    try {
      // 역할에 따라 목록 조회해야함
      const ownerRentals = await fetchRentals({
        userId,
        userRole: "OWNER",
        condition: "active",
      });

      const renterRentals = await fetchRentals({
        userId,
        userRole: "RENTER",
        condition: "active",
      });

      // API 응답 데이터 로깅
      console.log("[대여-API] 오너 렌탈 데이터 개수:", ownerRentals.length);
      console.log("[대여-API] 렌터 렌탈 데이터 개수:", renterRentals.length);
      console.log(
        "[대여-API] 오너 렌탈 데이터 샘플:",
        ownerRentals.length > 0 ? ownerRentals[0] : "empty"
      );
      console.log(
        "[대여-API] 렌터 렌탈 데이터 샘플:",
        renterRentals.length > 0 ? renterRentals[0] : "empty"
      );

      // 매핑 전 프로필 이미지 URL 확인
      if (ownerRentals.length > 0) {
        console.log("[대여-API] 프로필 이미지 필드 확인:", {
          ownerProfileImageUrl: ownerRentals[0].ownerProfileImageUrl,
          renterProfileImageUrl: ownerRentals[0].renterProfileImageUrl,
          productImageUrls: ownerRentals[0].productImageUrls,
        });
      }

      // 합치기
      const allRentals = [...ownerRentals, ...renterRentals].map(
        (rental: any) => {
          console.log("[대여-API] 렌탈 매핑 - rentalId:", rental.rentalId);

          return {
            rentalId: rental.rentalId,
            process: rental.rentalProcess,
            detailStatus: rental.rentalStatus,
            rentalDetail: {
              title: rental.title,
              rentalId: rental.rentalId,
              charge: rental.rentalFee,
              deposit: rental.deposit,
              renterId: rental.renterId,
              ownerId: rental.ownerId,
              // productImageUrl: rental.productImageUrl,
              // 배열의 첫 번째 항목 사용
              productImageUrl:
                rental.productImageUrls && rental.productImageUrls.length > 0
                  ? rental.productImageUrls[0]
                  : rental.productImageUrl || "",
              ownerProfileImageUrl:
                rental.ownerProfileImageUrl || "/images/profileimg.png",
              renterProfileImageUrl:
                rental.renterProfileImageUrl || "/images/profileimg.png",
            },
          };
        }
      );

      console.log("[대여-API] 처리된 렌탈 목록:", allRentals);

      setActiveRentals(allRentals);
      setError(null);
    } catch (err) {
      console.error("[대여-API] 대여 목록 요청 실패:", err);
      setError("대여 목록을 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // 웹소켓 연결 설정 부분
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const uuid = localStorage.getItem("uuid");

    console.log(
      "[대여-웹소켓] 연결 시도 - token 존재:",
      !!token,
      "uuid 존재:",
      !!uuid,
      "userId 존재:",
      !!userId
    );

    if (!token || !uuid || !userId) {
      setLoading(false);
      return;
    }

    let client: Client | null = null;

    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://k12e205.p.ssafy.io:8081";
      const socket = new SockJS(`${baseUrl}/ws-rental`);
      console.log("[대여-웹소켓] 소켓 생성:", `${baseUrl}/ws-rental`);

      // STOMP 클라이언트
      client = new Client({
        webSocketFactory: () => socket,
        debug: (str) => {
          console.log("STOMP Rental: " + str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 10000,
        heartbeatOutgoing: 10000,
        connectHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      client.onConnect = () => {
        setIsConnected(true);
        console.log("[대여-웹소켓] 연결 성공");

        // 사용자 UUID 기반 토픽 구독
        console.log("[대여-웹소켓] 토픽 구독:", `/topic/rental/${uuid}/status`);
        client?.subscribe(`/topic/rental/${uuid}/status`, (message) => {
          try {
            const rentalStatusData: RentalStatusMessage = JSON.parse(
              message.body
            );
            console.log("[대여-웹소켓] 수신 데이터:", rentalStatusData);

            // 프로필 이미지 정보 검사
            const profileInfo = {
              "rentalDetail 존재": !!rentalStatusData.rentalDetail,
              ownerProfileImageUrl:
                rentalStatusData.rentalDetail?.ownerProfileImageUrl,
              renterProfileImageUrl:
                rentalStatusData.rentalDetail?.renterProfileImageUrl,
              productImageUrl: rentalStatusData.rentalDetail?.productImageUrl,
            };
            console.log("[대여-웹소켓] 프로필 이미지 정보:", profileInfo);

            handleRentalUpdate(rentalStatusData);
          } catch (e) {
            console.error("[대여-웹소켓] 메시지 처리 오류:", e);
          }
        });

        // 초기 데이터 로드
        console.log("[대여-웹소켓] 초기 데이터 로드 시작");
        fetchRentalData();
      };

      client.onStompError = (frame) => {
        console.error("[대여-웹소켓] STOMP 오류:", frame.headers["message"]);
        console.error("[대여-웹소켓] 추가 정보:", frame.body);
        setError("서버 연결에 문제가 발생했습니다.");
        setIsConnected(false);
      };

      client.onWebSocketClose = () => {
        console.log("[대여-웹소켓] 연결 종료");
        setIsConnected(false);
      };

      console.log("[대여-웹소켓] 활성화 중...");
      client.activate();
    } catch (e) {
      console.error("[대여-웹소켓] 연결 오류:", e);
      setError("웹소켓 연결에 실패했습니다.");
    }

    return () => {
      if (client && client.connected) {
        try {
          console.log("[대여-웹소켓] 연결 해제 중...");
          client?.unsubscribe(`/topic/rental/${uuid}/status`);
          client.deactivate();
        } catch (e) {
          console.error("[대여-웹소켓] 종료 오류:", e);
        }
      }
    };
  }, [userId, fetchRentalData]);

  // 여기서 대여 상태 업데이트함
  const handleRentalUpdate = (updatedRental: RentalStatusMessage) => {
    console.log(
      "[대여-웹소켓] 렌탈 업데이트 처리 - rentalId:",
      updatedRental.rentalId
    );

    setActiveRentals((prev) => {
      // 기존 대여를 검색하고
      const existingIndex = prev.findIndex(
        (r) => r.rentalId === updatedRental.rentalId
      );
      console.log("[대여-웹소켓] 기존 인덱스:", existingIndex);

      if (existingIndex >= 0) {
        // 기존 대여 업데이트한다
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          process: updatedRental.process,
          detailStatus: updatedRental.detailStatus,
          rentalDetail: {
            ...updated[existingIndex].rentalDetail,
            ...updatedRental.rentalDetail,
            ownerProfileImageUrl:
              updatedRental.rentalDetail?.ownerProfileImageUrl ||
              updated[existingIndex].rentalDetail?.ownerProfileImageUrl ||
              "/images/profileimg.png",
            renterProfileImageUrl:
              updatedRental.rentalDetail?.renterProfileImageUrl ||
              updated[existingIndex].rentalDetail?.renterProfileImageUrl ||
              "/images/profileimg.png",
          },
        };
        console.log("[대여-웹소켓] 업데이트된 렌탈:", updated[existingIndex]);
        return updated;
      } else {
        // 새 대여 추가시에는 프로필 이미지가 없는 경우 기본값 설정
        const newRental = {
          ...updatedRental,
          rentalDetail: {
            ...updatedRental.rentalDetail,
            ownerProfileImageUrl:
              updatedRental.rentalDetail?.ownerProfileImageUrl ||
              "/images/profileimg.png",
            renterProfileImageUrl:
              updatedRental.rentalDetail?.renterProfileImageUrl ||
              "/images/profileimg.png",
          },
        };
        console.log("[대여-웹소켓] 새 렌탈 추가:", newRental);
        return [...prev, newRental];
      }
    });
  };

  return {
    activeRentals,
    isConnected,
    loading,
    error,
    refreshRentals: fetchRentalData,
  };
}
