// import { useEffect, useRef, useState, useCallback } from 'react';
// import { ChatRoomUI } from '@/types/chats/chat';
// import useUserStore from '@/lib/store/useUserStore';
// import SockJS from 'sockjs-client';
// import { Client } from '@stomp/stompjs';

// interface UseChatListWebSocketProps {
//     onChatRoomUpdate?: (chatRoom: ChatRoomUI) => void;
// }

// export const useChatListWebSocket = ({ onChatRoomUpdate }: UseChatListWebSocketProps) => {
//     const userId = useUserStore(state => state.userId);
//     const [isConnected, setIsConnected] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const stompClientRef = useRef<Client | null>(null);

//     const WS_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://k12e205.p.ssafy.io:8081';
//     const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

//     const connect = useCallback(() => {
//         if (!userId) {
//             console.warn('WebSocket 연결에 필요한 userId가 없습니다.');
//             return;
//         }

//         if (stompClientRef.current && stompClientRef.current.connected) {
//             return;
//         }

//         if (stompClientRef.current) {
//             stompClientRef.current.deactivate();
//             stompClientRef.current = null;
//         }

//         const socket = new SockJS(`${WS_BASE_URL}/ws-chat`);
//         const stompClient = new Client({
//             webSocketFactory: () => socket,
//             connectHeaders: token ? { Authorization: `Bearer ${token}` } : {},
//             debug: (str) => console.log('STOMP Debug:', str),
//             reconnectDelay: 5000,
//             heartbeatIncoming: 4000,
//             heartbeatOutgoing: 4000,
//         });

//         stompClient.onConnect = () => {
//             console.log('채팅방 목록 WebSocket 연결 성공');
//             setIsConnected(true);
//             setError(null);

//             // 사용자의 모든 채팅방 업데이트 구독
//             stompClient.subscribe(`/topic/chat-rooms/${userId}`, (message) => {
//                 try {
//                     const data = JSON.parse(message.body);
//                     console.log('채팅방 업데이트 수신:', data);

//                     if (onChatRoomUpdate) {
//                         onChatRoomUpdate(data);
//                     }
//                 } catch (err) {
//                     console.error('채팅방 업데이트 메시지 파싱 오류:', err);
//                 }
//             });
//         };

//         stompClient.onStompError = (frame) => {
//             console.error('STOMP 오류:', frame);
//             setError('연결에 실패했습니다. 다시 시도 중...');
//             setIsConnected(false);
//         };

//         stompClient.onWebSocketClose = () => {
//             console.log('WebSocket 연결 종료');
//             setIsConnected(false);
//         };

//         stompClient.activate();
//         stompClientRef.current = stompClient;
//     }, [userId, onChatRoomUpdate, WS_BASE_URL, token]);

//     const disconnect = useCallback(() => {
//         if (stompClientRef.current) {
//             stompClientRef.current.deactivate();
//             stompClientRef.current = null;
//         }
//     }, []);

//     useEffect(() => {
//         if (userId) {
//             connect();

//             const handleOnline = () => {
//                 console.log('네트워크 연결됨. WebSocket 재연결 시도');
//                 connect();
//             };

//             window.addEventListener('online', handleOnline);

//             return () => {
//                 disconnect();
//                 window.removeEventListener('online', handleOnline);
//             };
//         }
//     }, [userId, connect, disconnect]);

//     return {
//         isConnected,
//         error,
//         connect,
//         disconnect,
//     };
// }; 