// lib/hooks/widget/useRentalWebSocket.ts
import { useState, useEffect, useCallback } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import useUserStore from '@/lib/store/useUserStore';
import { RentalProcess, RentalStatus, RENTAL_PROCESS, RENTAL_STATUS } from '@/types/rental/status';
import { fetchRentals } from '@/lib/api/rental/request';

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
  
  // A초기 대여 목록 가져오기 - api 호출 
  const fetchRentalData = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      // 역할에 따라 목록 조회해야함 
      const ownerRentals = await fetchRentals({
        userId,
        userRole: 'OWNER',
        condition: 'active',
      });
      
      const renterRentals = await fetchRentals({
        userId,
        userRole: 'RENTER',
        condition: 'active',
      });
      
      // 합치기 
      const allRentals = [...ownerRentals, ...renterRentals].map((rental: any) => ({
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
    productImageUrl: rental.productImageUrls && rental.productImageUrls.length > 0 
    ? rental.productImageUrls[0] 
    : rental.productImageUrl || '',
          ownerProfileImageUrl: rental.ownerProfileImageUrl || '/images/profileimg.png',
    renterProfileImageUrl: rental.renterProfileImageUrl || '/images/profileimg.png'
        }
      }));
      
      setActiveRentals(allRentals);
      setError(null);
    } catch (err) {
      console.error('대여 목록 요청 실패:', err);
      setError('대여 목록을 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // 웹소켓 연결 설정 부분 
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const uuid = localStorage.getItem('uuid');
    
    if (!token || !uuid || !userId) {
      setLoading(false);
      return;
    }
    
    let client: Client | null = null;
    
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://k12e205.p.ssafy.io:8081';
      const socket = new SockJS(`${baseUrl}/ws-rental`);
      
      // STOMP 클라이언트 
      client = new Client({
        webSocketFactory: () => socket,
        debug: (str) => {
          console.log('STOMP Rental: ' + str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 10000,
        heartbeatOutgoing: 10000,
        connectHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      client.onConnect = () => {
        setIsConnected(true);
        console.log('Connected to Rental WebSocket');
        
        // 사용자 UUID 기반 토픽 구독
        client?.subscribe(`/topic/rental/${uuid}/status`, (message) => {
          try {
            const rentalStatusData: RentalStatusMessage = JSON.parse(message.body);
            console.log('Received rental status update:', rentalStatusData);
            handleRentalUpdate(rentalStatusData);
          } catch (e) {
            console.error('메시지 처리 오류:', e);
          }
        });
        
        // 초기 데이터 로드
        fetchRentalData();
      };

      client.onStompError = (frame) => {
        console.error('STOMP Error:', frame.headers['message']);
        console.error('Additional details:', frame.body);
        setError('서버 연결에 문제가 발생했습니다.');
        setIsConnected(false);
      };
      
      client.onWebSocketClose = () => {
        setIsConnected(false);
      };

      client.activate();
    } catch (e) {
      console.error('웹소켓 연결 오류:', e);
      setError('웹소켓 연결에 실패했습니다.');
    }
    
    return () => {
      if (client && client.connected) {
        try {
          client?.unsubscribe(`/topic/rental/${uuid}/status`);
          client.deactivate();
        } catch (e) {
          console.error('웹소켓 종료 오류:', e);
        }
      }
    };
  }, [userId, fetchRentalData]);

  // 여기서 대여 상태 업데이트함 
  const handleRentalUpdate = (updatedRental: RentalStatusMessage) => {
    setActiveRentals(prev => {
      // 기존 대여를 검색하고 
      const existingIndex = prev.findIndex(r => r.rentalId === updatedRental.rentalId);
      
      if (existingIndex >= 0) {
        // 기존 대여 업데이트한다 
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          process: updatedRental.process,
          detailStatus: updatedRental.detailStatus,
          rentalDetail: updatedRental.rentalDetail || updated[existingIndex].rentalDetail
        };
        return updated;
      } else {
        // 새 대여 추가
        return [...prev, updatedRental];
      }
    });
  };

  return {
    activeRentals,
    isConnected,
    loading,
    error,
    refreshRentals: fetchRentalData
  };
}