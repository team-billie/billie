import { useEffect, useRef, useState, useCallback } from 'react';
import { ChatMessageDto } from '@/types/chats/chat';
import useUserStore from '@/lib/store/useUserStore';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

interface UseWebSocketProps {
  roomId: string;
  onMessage?: (message: ChatMessageDto) => void;
}

/**
 * WebSocket 연결 훅
 */
export const useWebSocket = ({ roomId, onMessage }: UseWebSocketProps) => {
  const userId = useUserStore(state => state.userId);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const stompClientRef = useRef<Client | null>(null);

  const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_URL || 'http://k12e205.p.ssafy.io:8081';

  const connect = useCallback(() => {
    if (!userId || !roomId) {
      console.warn('WebSocket 연결에 필요한 userId 또는 roomId가 없습니다.');
      return;
    }

    // 기존 연결이 있다면 해제
    if (stompClientRef.current) {
      stompClientRef.current.deactivate();
      stompClientRef.current = null;
    }

    // SockJS 클라이언트 생성
    const socket = new SockJS(`${WS_BASE_URL}/ws-chat`);

    // STOMP 클라이언트 생성
    const stompClient = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {},
      debug: (str) => {
        console.log('STOMP Debug:', str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    // 연결 성공 시
    stompClient.onConnect = () => {
      console.log('STOMP 연결 성공');
      setIsConnected(true);
      setError(null);

      // 구독 설정
      stompClient.subscribe(`/topic/rooms/${roomId}`, (message) => {
        try {
          const data = JSON.parse(message.body);
          console.log('메시지 수신:', data);

          if (onMessage) {
            const chatMessage: ChatMessageDto = {
              roomId: data.roomId || roomId,
              senderId: data.senderId || 0,
              content: data.content || '',
              sentAt: data.sentAt || new Date().toISOString()
            };
            onMessage(chatMessage);
          }
        } catch (err) {
          console.error('메시지 파싱 오류:', err, '원본 데이터:', message.body);
        }
      });
    };

    // 연결 실패 시
    stompClient.onStompError = (frame) => {
      console.error('STOMP 오류:', frame);
      setError('연결에 실패했습니다. 다시 시도 중...');
      setIsConnected(false);
    };

    // 연결 해제 시
    stompClient.onWebSocketClose = () => {
      console.log('WebSocket 연결 종료');
      setIsConnected(false);
    };

    // 연결 시작
    stompClient.activate();
    stompClientRef.current = stompClient;
  }, [userId, roomId, onMessage, WS_BASE_URL]);

  const disconnect = useCallback(() => {
    if (stompClientRef.current) {
      stompClientRef.current.deactivate();
      stompClientRef.current = null;
    }
  }, []);

  const sendMessage = useCallback((content: string) => {
    if (!userId) {
      console.error('userId가 없습니다.');
      setError('사용자 정보가 없습니다');
      return false;
    }

    if (!stompClientRef.current || !stompClientRef.current.connected) {
      console.error('STOMP 연결 상태:', stompClientRef.current?.connected);
      setError('연결이 활성화되지 않았습니다');
      return false;
    }

    try {
      const message = {
        roomId,
        senderId: userId,
        content,
        sentAt: new Date().toISOString(),
      };

      console.log('메시지 전송:', message);
      stompClientRef.current.publish({
        destination: '/app/chat.send',
        body: JSON.stringify(message)
      });
      return true;
    } catch (err) {
      console.error('메시지 전송 오류:', err);
      setError('메시지를 전송할 수 없습니다');
      return false;
    }
  }, [roomId, userId]);

  useEffect(() => {
    if (userId && roomId) {
      connect();

      const handleOnline = () => {
        console.log('네트워크 연결됨. WebSocket 재연결 시도');
        connect();
      };

      window.addEventListener('online', handleOnline);

      return () => {
        disconnect();
        window.removeEventListener('online', handleOnline);
      };
    }
  }, [connect, disconnect, userId, roomId]);

  return {
    isConnected,
    error,
    sendMessage,
    connect,
    disconnect,
  };
};