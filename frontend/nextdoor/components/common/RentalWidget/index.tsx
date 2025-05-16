// // components/DraggableWidget.tsx
// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import Image from 'next/image';
// import Draggable from 'react-draggable';
// import ActionButton from './ActionButton';

// const DraggableWidget = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [position, setPosition] = useState({ x: 20, y: 500 });
//   const dragStartPos = useRef({ x: 0, y: 0 });
//   const wasDragged = useRef(false);
//   const nodeRef = useRef(null);
//   const [pendingReservation, setPendingReservation] = useState(false);
  
//   // 초기 위치 설정
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const savedPosition = localStorage.getItem('widgetPosition');
//       if (savedPosition) {
//         setPosition(JSON.parse(savedPosition));
//       } else {
//         // 오른쪽 상단에 위치하도록 설정
//         setPosition({ x: window.innerWidth - 100, y: 200 });
//       }
//     }
//   }, []);

//   // 드래그 시작 위치 기록
//   const handleStart = (e: any, data: { x: number, y: number }) => {
//     dragStartPos.current = { x: data.x, y: data.y };
//     wasDragged.current = false;
//   };

//   // 드래그 중 핸들러
//   const handleDrag = (e: any, data: { x: number, y: number }) => {
//     // 일정 거리 이상 이동했으면 드래그로 간주
//     const dx = Math.abs(data.x - dragStartPos.current.x);
//     const dy = Math.abs(data.y - dragStartPos.current.y);
    
//     if (dx > 5 || dy > 5) {
//       wasDragged.current = true;
//     }
    
//     setPosition({ x: data.x, y: data.y });
//   };

//   // 드래그 종료 핸들러
//   const handleStop = (e: any, data: { x: number, y: number }) => {
//     // 위치 저장
//     localStorage.setItem('widgetPosition', JSON.stringify({ x: data.x, y: data.y }));
    
//     // 드래그되지 않았으면 클릭으로 간주하고 모달 토글
//     if (!wasDragged.current) {
//       setIsOpen(prev => !prev); // 이전 상태의 반대로 토글
//     }
//   };

//    // 액션 핸들러 (백엔드 구현 전 임시 처리)
//    const handleAction = (userId: string, actionType?: string) => {
//     console.log(`Action for user ${userId}: ${actionType || '기본 액션'}`);
//     // 나중에 백엔드 연동 시 여기에 실제 API 호출 추가
    
//     // 사용자 피드백을 위한 임시 알림
//     alert(`${userId}에 대한 ${actionType || '액션'}이 요청되었습니다.`);
//   };

//   // 드래극 가능 -- 항상 최상단에
//   return (
//     <>
    
//       <Draggable
//   nodeRef={nodeRef}
//   position={position}
//   onStart={handleStart}
//   onDrag={handleDrag}
//   onStop={handleStop}
//   bounds="parent"
// >
//   <div 
//     ref={nodeRef}
//     className="absolute z-50 cursor-move"
//     style={{ touchAction: 'none' }}
//   >
//     <div className="w-14 h-14 flex items-center justify-center">
//       <Image
//         src="/images/blueStar.png"
//         alt="위젯 열기/닫기"
//         width={56}
//         height={56}
//         priority
//         className="drop-shadow-lg select-none w-auto h-auto"
//         draggable="false"
//       />
//     </div>
//   </div>
// </Draggable>
      
//       {/* 오버레이 */}
//       {isOpen && (
//         <div 
//           className="absolute inset-0 bg-black bg-opacity-70 z-40 overflow-auto"
//         >
//           {/* 헤더 */}
//           <div className="px-5 py-4 flex items-center justify-between text-white">
//             <h2 className="text-3xl font-extrabold mt-10">원클릭 빌리 매니저
//               <p className="text-blue-300 font-medium text-xl mt-2 mb-6">거래가 멈춰있어요! 얼른 처리해 주세요!</p>
//             </h2>
//           </div>
          
//           {/* 모달 콘텐츠 */}
// <div className="px-5 py-2 text-white">
//   <div className="space-y-4 mb-8">
//     <ActionButton 
//       type="payment"
//       userName="안심대여"
//       userDetail="84"
//       onAction={() => handleAction('user1')}
//       productImage="/icons/icon72.png" 
//       profileImage="/images/profileimg.png" 
//     />
    
//     <ActionButton 
//       type="return"
//       userName="안심대여"
//       userDetail="꿍얼꿍얼얼"
//       onAction={() => handleAction('user2')}
//       productImage="/icons/icon72.png"
//       profileImage="/images/profileimg.png"
//     />
    
//     <ActionButton 
//       type="reservation"
//       userName="예약요청"
//       userDetail="꿍얼꿍얼얼"
//       onAction={(action) => handleAction('user3', action)}
//       productImage="/icons/icon72.png"
//       profileImage="/images/profileimg.png"
//     />
//   </div>
// </div>

//         </div>
//       )}
//     </>
//   );
// };

// export default DraggableWidget;