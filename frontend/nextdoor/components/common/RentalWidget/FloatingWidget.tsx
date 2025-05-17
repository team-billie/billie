// components/FloatingWidget.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Draggable from 'react-draggable';
import useReservationWebSocket from '@/lib/hooks/widget/useReservationWebSocket';
import useRentalWebSocket, { RentalStatusMessage } from '@/lib/hooks/widget/useRentalWebSocket';
import ReservationActionButton from './ReservationActionButton';
import RentalActionButton from './RentalActionButton';
import useAlertModal from '@/lib/hooks/alert/useAlertModal';
import useUserStore from '@/lib/store/useUserStore';

const FloatingWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 500 });
  const [isShining, setIsShining] = useState(false); 
  const [prevRequestCount, setPrevRequestCount] = useState(0); 
  const dragStartPos = useRef({ x: 0, y: 0 });
  const wasDragged = useRef(false);
  const nodeRef = useRef(null);
  
  const { userId } = useUserStore();
  
  // 예약 WebSocket 훅
  const {
    pendingReservations,
    isConnected,
    loading,
    error,
    confirmReservation,
    cancelReservation,
  } = useReservationWebSocket();
  
  // 대여 WebSocket 훅
  const {
    activeRentals,
    isConnected: isRentalConnected,
    loading: rentalLoading,
    error: rentalError,
    refreshRentals,
  } = useRentalWebSocket();
  
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
  
  // 처리가 필요한 대여 항목 필터링
  const actionNeededRentals = activeRentals.filter(rental => {
    const isOwner = userId === rental.rentalDetail?.ownerId;
    const isRenter = userId === rental.rentalDetail?.renterId;

    if (isOwner) {
      return (
        (rental.process === 'BEFORE_RENTAL' && rental.detailStatus === 'CREATED') ||
        (rental.process === 'RETURNED' && rental.detailStatus === 'RENTAL_PERIOD_ENDED') ||
        (rental.process === 'RETURNED' && rental.detailStatus === 'BEFORE_AND_AFTER_COMPARED')
      );
    } else if (isRenter) {
      return (
        (rental.process === 'BEFORE_RENTAL' && rental.detailStatus === 'REMITTANCE_REQUESTED') ||
        (rental.process === 'BEFORE_RENTAL' && rental.detailStatus === 'BEFORE_PHOTO_ANALYZED')
      );
    }
    
    return false;
  });
  
  // 현재 총 요청 수 계산
  const totalRequestCount = pendingReservations.length + paymentRequests.length + returnRequests.length + actionNeededRentals.length;
  
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
        setPosition({ x: window.innerWidth - 100, y: 200 });
      }
    }
  }, []);

  // 드래그 
  const handleStart = (e: any, data: { x: number, y: number }) => {
    dragStartPos.current = { x: data.x, y: data.y };
    wasDragged.current = false;
  };

  const handleDrag = (e: any, data: { x: number, y: number }) => {
    const dx = Math.abs(data.x - dragStartPos.current.x);
    const dy = Math.abs(data.y - dragStartPos.current.y);
    
    if (dx > 5 || dy > 5) {
      wasDragged.current = true;
    }
    
    setPosition({ x: data.x, y: data.y });
  };

  // 드래그 종료 
  const handleStop = (e: any, data: { x: number, y: number }) => {
    localStorage.setItem('widgetPosition', JSON.stringify({ x: data.x, y: data.y }));
    
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
  
  // 예약 확정/취소 
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

  
  const getRentalActionLink = (rental: RentalStatusMessage) => {
    const { rentalId, process, detailStatus } = rental;
    const isOwner = userId === rental.rentalDetail?.ownerId;
    
    if (isOwner) {
      switch (process) {
        case 'BEFORE_RENTAL':
          if (detailStatus === 'CREATED') {
            return `/safe-deal/${rentalId}/before/payment-request`;
          }
          break;
        case 'RETURNED':
          if (detailStatus === 'RENTAL_PERIOD_ENDED') {
            return `/safe-deal/${rentalId}/after/photos-register`;
          } else if (detailStatus === 'BEFORE_AND_AFTER_COMPARED') {
            return `/safe-deal/${rentalId}/after/analysis`;
          }
          break;
      }
    } else {
      // 렌터인 경우
      switch (process) {
        case 'BEFORE_RENTAL':
          if (detailStatus === 'REMITTANCE_REQUESTED') {
            return `/safe-deal/${rentalId}/before/photos-register`;
          } else if (detailStatus === 'BEFORE_PHOTO_ANALYZED') {
            return `/safe-deal/${rentalId}/before/payment`;
          }
          break;
      }
    }
    
    return '';
  };

  // 렌탈 버튼 텍스트
  const getRentalButtonText = (rental: RentalStatusMessage) => {
    const { process, detailStatus } = rental;
    const isOwner = userId === rental.rentalDetail?.ownerId;
    
    if (isOwner) {
      switch (process) {
        case 'BEFORE_RENTAL':
          return detailStatus === 'CREATED' ? '안심 결제 요청' : '안심 결제 요청됨';
        case 'RENTAL_IN_ACTIVE':
          return '물품 결제 완료';
        case 'RETURNED':
          return detailStatus === 'RENTAL_PERIOD_ENDED' ? '안심 반납 처리' :
                detailStatus === 'BEFORE_AND_AFTER_COMPARED' ? '보증금 처리' : '반납 처리 중';
        case 'RENTAL_COMPLETED':
          return '거래 완료';
        default:
          return '처리하기';
      }
    } else {
      switch (process) {
        case 'BEFORE_RENTAL':
          return (detailStatus === 'REMITTANCE_REQUESTED' || detailStatus === 'BEFORE_PHOTO_ANALYZED') ?
                '안심 결제' : '안심 결제 대기';
        case 'RENTAL_IN_ACTIVE':
          return '물품 결제 완료';
        case 'RETURNED':
          return '반납 중';
        case 'RENTAL_COMPLETED':
          return '거래 완료';
        default:
          return '처리하기';
      }
    }
  };

  const shiningClass = isShining 
    ? "drop-shadow-lg select-none w-auto h-auto animate-shine" 
    : "drop-shadow-lg select-none w-auto h-auto";

  // 드래그 가능 -- 항상 최상단에
  return (
    <>
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
            {totalRequestCount > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-400 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {totalRequestCount}
              </div>
            )}
          </div>
        </div>
      </Draggable>
      
      {/* 오버레이 */}
      {isOpen && (
        <div 
          className="absolute inset-0 bg-black bg-opacity-70 z-40 overflow-auto p-2"
        >
          {/* 헤더 */}
          <div className="px-5 py-4 flex items-center justify-between text-white">
            <h2 className="text-3xl font-extrabold mt-10">원클릭 빌리 매니저
              <p className="text-blue-300 font-medium text-xl mt-2 mb-8">
                {totalRequestCount > 0 ? '거래가 멈췄어요! 지금 이어가볼까요?' : '현재 처리할 거래가 없습니다.'}
              </p>
            </h2>
          </div>
          
          {/* 모달 콘텐츠 */}
          <div className="px-5 py-2 text-white">
            <div className="space-y-4 mb-8">
              {/* 예약 요청 항목 */}
              {loading ? (
                <div className="text-center py-4 text-gray-300">
                  <p>예약 정보 로딩 중...</p>
                </div>
              ) : pendingReservations.length > 0 ? (
                pendingReservations.map((reservation: any) => (
                  <ReservationActionButton
                    key={reservation.reservationId}
                    id={reservation.reservationId}
                    title={reservation.postTitle}
                    productImage={reservation.postProductImages || "/icons/icon72.png"}
                    profileImage={reservation.renterProfileImageUrl || "/images/profileimg.png"}
                    isReservation={true}
                    onConfirm={() => handleReservationAction(reservation.reservationId, 'confirm')}
                    onCancel={() => handleReservationAction(reservation.reservationId, 'cancel')}
                  />
                ))
              ) : null}
              
              {/* 결제 요청 항목 */}
              {paymentRequests.map((item) => (
                <ReservationActionButton
                  key={item.id}
                  id={item.id}
                  title="안심대여"
                  detail={item.detail}
                  productImage={item.productImage}
                  profileImage={item.profileImage}
                  actionText="결제요청"
                  onAction={() => handlePaymentRequest(item.id)}
                />
              ))}
              
              {/* 안심 반납 처리 항목 */}
              {returnRequests.map((item) => (
                <ReservationActionButton
                  key={item.id}
                  id={item.id}
                  title="안심대여"
                  detail={item.detail}
                  productImage={item.productImage}
                  profileImage={item.profileImage}
                  actionText="안심 반납 처리"
                  onAction={() => handleReturnRequest(item.id)}
                />
              ))}
              
              {/* 대여 요청 항목 */}
              {!rentalLoading && actionNeededRentals.length > 0 && (
                actionNeededRentals.map((rental) => {
                  const isOwner = userId === rental.rentalDetail?.ownerId;
                  const actionLink = getRentalActionLink(rental);
                  const buttonText = getRentalButtonText(rental);
                  const displayTitle = rental.rentalDetail?.title || "대여 물품";
                  
                  return (
                    <RentalActionButton
                      key={rental.rentalId}
                      rentalId={rental.rentalId}
                      title={displayTitle}
                      isOwner={isOwner}
                      productImage={rental.rentalDetail?.productImageUrl || '/icons/icon72.png'}
                      profileImage="/images/profileimg.png"
                      buttonText={buttonText}
                      actionLink={actionLink}
                    />
                  );
                })
              )}
              
              {/* 전체 로딩 중이거나 데이터가 없는 경우 */}
              {(loading || rentalLoading) && totalRequestCount === 0 ? (
                <div className="text-center py-4 text-gray-300">
                  <p>거래 정보 로딩 중...</p>
                </div>
              ) : totalRequestCount === 0 ? (
                <div className="text-center py-4 text-gray-300">
                  <p>처리할 거래 내역이 없습니다.</p>
                </div>
              ) : null}
              
              {/* 연결 상태 표시 */}
              {!isConnected && !isRentalConnected && (
                <div className="text-center py-2 text-yellow-300 text-sm">
                  <p>서버 연결 중~~~~~</p>
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