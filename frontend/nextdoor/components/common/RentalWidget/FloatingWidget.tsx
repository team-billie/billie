// components/FloatingWidget.tsx
//  위젯 UI
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Draggable from 'react-draggable';
import useReservationWebSocket from '@/lib/hooks/widget/useReservationWebSocket';
import ActionButton from './ActionButton';
import useAlertModal from '@/lib/hooks/alert/useAlertModal';

const FloatingWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 500 });
  const [isShining, setIsShining] = useState(false); // 반짝이는 효과를 위한 상태
  const [prevRequestCount, setPrevRequestCount] = useState(0); // 이전 요청 수를 저장하는 상태
  const dragStartPos = useRef({ x: 0, y: 0 });
  const wasDragged = useRef(false);
  const nodeRef = useRef(null);
  
  // WebSocket 훅
  const {
    pendingReservations,
    isConnected,
    loading,
    error,
    confirmReservation,
    cancelReservation,
  } = useReservationWebSocket();
  
  const { showAlert } = useAlertModal();
  
  // 임시 데이터 - 실제 구현 시 API에서 가져와야함
  const [paymentRequests, setPaymentRequests] = useState([
    {
      id: 1,
      detail: '경민 임시데이터터',
      productImage: '/icons/icon72.png',
      profileImage: '/images/profileimg.png'
    }
  ]);
  
  const [returnRequests, setReturnRequests] = useState([
    {
      id: 2,
      detail: '꿍얼꿍얼 임시데이터 ',
      productImage: '/icons/icon72.png',
      profileImage: '/images/profileimg.png'
    }
  ]);
  
  // 현재 총 요청 수 계산
  const totalRequestCount = pendingReservations.length + paymentRequests.length + returnRequests.length;
  
  useEffect(() => {
    if (totalRequestCount > prevRequestCount) {
      setIsShining(true);
      
      const timer = setTimeout(() => {
        setIsShining(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
    
    // 이전 요청 수 업데이트
    setPrevRequestCount(totalRequestCount);
  }, [totalRequestCount, prevRequestCount]);
  
  // 초기 위치 설정
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPosition = localStorage.getItem('widgetPosition');
      if (savedPosition) {
        setPosition(JSON.parse(savedPosition));
      } else {
        // 오른쪽 상단에 위치하도록 설정
        setPosition({ x: window.innerWidth - 100, y: 200 });
      }
    }
  }, []);

  // 드래그 시작 위치 기록
  const handleStart = (e: any, data: { x: number, y: number }) => {
    dragStartPos.current = { x: data.x, y: data.y };
    wasDragged.current = false;
  };

  // 드래그 중 핸들러
  const handleDrag = (e: any, data: { x: number, y: number }) => {
    // 일정 거리 이상 이동했으면 드래그로 간주
    const dx = Math.abs(data.x - dragStartPos.current.x);
    const dy = Math.abs(data.y - dragStartPos.current.y);
    
    if (dx > 5 || dy > 5) {
      wasDragged.current = true;
    }
    
    setPosition({ x: data.x, y: data.y });
  };

  // 드래그 종료 핸들러
  const handleStop = (e: any, data: { x: number, y: number }) => {
    // 위치 저장
    localStorage.setItem('widgetPosition', JSON.stringify({ x: data.x, y: data.y }));
    
    // 드래그되지 않았으면 클릭으로 간주하고 모달 토글
    if (!wasDragged.current) {
      setIsOpen(prev => !prev);
    }
  };

  // 결제요청 처리
  const handlePaymentRequest = (id: number) => {
    showAlert('결제 요청', '결제 요청이 전송되었습니다.', 'success');
    setPaymentRequests(prev => prev.filter(item => item.id !== id));
  };
  
  // 안심 반납 처리
  const handleReturnRequest = (id: number) => {
    showAlert('반납 처리', '안심 반납 처리가 완료되었습니다.', 'success');
    setReturnRequests(prev => prev.filter(item => item.id !== id));
  };
  
  // 예약 확정/취소 액션 핸들러
  const handleReservationAction = async (reservationId: number, actionType?: string) => {
    try {
      if (actionType === 'confirm') {
        const success = await confirmReservation(reservationId);
        if (success) {
          showAlert('예약 확정', '예약이 확정되었습니다.', 'success');
        } else {
          showAlert('오류 발생', '예약 확정 중 문제가 발생했습니다.', 'error');
        }
      } else if (actionType === 'cancel') {
        const success = await cancelReservation(reservationId);
        if (success) {
          showAlert('예약 취소', '예약이 취소되었습니다.', 'info');
        } else {
          showAlert('오류 발생', '예약 취소 중 문제가 발생했습니다.', 'error');
        }
      }
    } catch (error) {
      console.error('예약 처리 실패:', error);
      showAlert('오류 발생', '요청 처리 중 문제가 발생했습니다.', 'error');
    }
  };

  // 반짝이는 효과를 위한 CSS 클래스
  const shiningClass = isShining 
    ? "drop-shadow-lg select-none w-auto h-auto animate-shine" 
    : "drop-shadow-lg select-none w-auto h-auto";

  // 드래그 가능 -- 항상 최상단에
  return (
    <>
      {/* 반짝이는 애니메이션을 위한 스타일 */}
      <style jsx global>{`
        @keyframes shine {
          0% { transform: scale(1); filter: brightness(1); }
          25% { transform: scale(1.1); filter: brightness(1.5) drop-shadow(0 0 8px #4a9df5); }
          50% { transform: scale(1); filter: brightness(1); }
          75% { transform: scale(1.1); filter: brightness(1.5) drop-shadow(0 0 8px #4a9df5); }
          100% { transform: scale(1); filter: brightness(1); }
        }
        
        .animate-shine {
          animation: shine 2s ease-in-out;
          animation-iteration-count: 3;
        }
      `}</style>
      
      <Draggable
        nodeRef={nodeRef}
        position={position}
        onStart={handleStart}
        onDrag={handleDrag}
        onStop={handleStop}
        bounds="parent"
      >
        <div 
          ref={nodeRef}
          className="absolute z-50 cursor-move"
          style={{ touchAction: 'none' }}
        >
          <div className="w-14 h-14 flex items-center justify-center">
            <Image
              src="/images/blueStar.png"
              alt="위젯 열기/닫기"
              width={56}
              height={56}
              priority
              className={shiningClass}
              draggable="false"
            />
            {(pendingReservations.length > 0 || paymentRequests.length > 0 || returnRequests.length > 0) && (
              <div className="absolute -top-1 -right-1 bg-red-400 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {pendingReservations.length + paymentRequests.length + returnRequests.length}
              </div>
            )}
          </div>
        </div>
      </Draggable>
      
      {/* 오버레이 */}
      {isOpen && (
        <div 
          className="absolute inset-0 bg-black bg-opacity-70 z-40 overflow-auto"
        >
          {/* 헤더 */}
          <div className="px-5 py-4 flex items-center justify-between text-white">
            <h2 className="text-3xl font-extrabold mt-10">원클릭 빌리 매니저
              <p className="text-blue-300 font-medium text-xl mt-2 mb-6">거래가 멈췄어요! 얼른 처리해 주세요!</p>
            </h2>
          </div>
          
          {/* 모달 콘텐츠 */}
          <div className="px-5 py-2 text-white">
            <div className="space-y-4 mb-8">
              {/* 결제 요청 항목 */}
              {paymentRequests.map((item) => (
                <ActionButton 
                  key={item.id}
                  type="payment"
                  userName="안심대여"
                  userDetail={item.detail}
                  onAction={() => handlePaymentRequest(item.id)}
                  productImage={item.productImage}
                  profileImage={item.profileImage}
                />
              ))}
              
              {/* 안심 반납 처리 항목 */}
              {returnRequests.map((item) => (
                <ActionButton 
                  key={item.id}
                  type="return"
                  userName="안심대여"
                  userDetail={item.detail}
                  onAction={() => handleReturnRequest(item.id)}
                  productImage={item.productImage}
                  profileImage={item.profileImage}
                />
              ))}
              
              {/* 예약 요청 항목 */}
              {loading ? (
                <div className="text-center py-4 text-gray-300">
                  <p>로딩 중...</p>
                </div>
              ) : pendingReservations.length > 0 ? (
                pendingReservations.map((reservation: any) => (
                  <ActionButton 
                    key={reservation.reservationId}
                    type="reservation"
                    userName="예약요청"
                    userDetail={reservation.postTitle}
                    onAction={(action) => handleReservationAction(reservation.reservationId, action)}
                    productImage={reservation.postProductImage || "/icons/icon72.png"}
                    profileImage={reservation.ownerProfileImageUrl || "/images/profileimg.png"}
                  />
                ))
              ) : (
                paymentRequests.length === 0 && returnRequests.length === 0 && (
                  <div className="text-center py-4 text-gray-300">
                    <p>처리할 예약 내역이 없습니다.</p>
                  </div>
                )
              )}
              
              {!isConnected && (
                <div className="text-center py-2 text-yellow-300 text-sm">
                  <p>서버 연결 중... 일부 기능이 제한될 수 있습니다.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingWidget;