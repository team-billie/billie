import { useEffect, useRef, useState, useCallback } from 'react';
import { ChatMessageDto } from '@/types/chats/chat';
import useUserStore from '@/lib/store/useUserStore'; 

interface UseWebSocketProps {
  conversationId: string;
  onMessage?: (message: ChatMessageDto) => void;
}

/**
 * WebSocket 연결 훅
 */
export const useWebSocket = ({ conversationId, onMessage }: UseWebSocketProps) => {
  const userId = useUserStore(state => state.userId);
  
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const attemptedUrls = useRef<string[]>([]);
  
  const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://k12e205.p.ssafy.io:8081';
  
  const getUrlsToTry = useCallback(() => {
    if (!userId) return [];

    // localStorage에서 accessToken 가져오기
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    
    return [
      `${WS_BASE_URL}/ws/chat?userId=${userId}&conv=${conversationId}${token ? `&token=${token}` : ''}`
    ];
  }, [WS_BASE_URL, userId, conversationId]);
  
  const tryConnectWithUrl = useCallback((url: string) => {
    console.log(`WebSocket 연결 시도: ${url}`);
    
    try {
      const socket = new WebSocket(url);
      
      socket.onopen = () => {
        console.log(`WebSocket 연결 성공: ${url}`);
        setIsConnected(true);
        setError(null);
        socketRef.current = socket;
        attemptedUrls.current = []; // 성공하면 시도 목록 초기화
      };
      
      socket.onmessage = (event) => {
        try {
          console.log('Raw message:', event.data);
          const data = JSON.parse(event.data);
          console.log('‼️‼️‼️‼️메시지 수신:', data);
          
          if (onMessage) {
            const chatMessage: ChatMessageDto = {
              conversationId: data.conversationId || conversationId,
              senderId: data.senderId || 0,
              content: data.content || data.message || '',
              sentAt: data.sentAt || new Date().toISOString()
            };
            onMessage(chatMessage);
          }
        } catch (err) {
          console.error('메시지 파싱 오류:', err, '원본 데이터:', event.data);
        }
      };
      
      socket.onerror = (event) => {
        console.error(`WebSocket 오류 (${url}):`, event);
      };
      
      socket.onclose = (event) => {
        console.log(`WebSocket 연결 종료 (${url}):`, event);
        console.log('연결 종료 코드:', event.code, '사유:', event.reason);
        
        if (socketRef.current === socket) {
          setIsConnected(false);
          socketRef.current = null;
          
          if (event.code !== 1000 && event.code !== 1001) {
            tryNextUrl();
          }
        }
      };
      
      return socket;
    } catch (err) {
      console.error(`WebSocket 초기화 오류 (${url}):`, err);
      return null;
    }
  }, [conversationId, onMessage]);
  
  const tryNextUrl = useCallback(() => {
    const urlsToTry = getUrlsToTry();
    const remainingUrls = urlsToTry.filter(url => !attemptedUrls.current.includes(url));
    
    if (remainingUrls.length > 0) {
      const nextUrl = remainingUrls[0];
      attemptedUrls.current.push(nextUrl);
      
      console.log(`다음 URL 시도 (${attemptedUrls.current.length}/${urlsToTry.length}): ${nextUrl}`);
      
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
      
      socketRef.current = tryConnectWithUrl(nextUrl);
    } else {
      console.log('모든 URL 시도 실패. 5초 후 처음부터 다시 시도');
      setError('연결에 실패했습니다. 다시 시도 중...');
      
      setTimeout(() => {
        attemptedUrls.current = [];
        connect();
      }, 5000);
    }
  }, [getUrlsToTry, tryConnectWithUrl]);
  
  const connect = useCallback(() => {
    if (!userId || !conversationId) {
      console.warn('WebSocket 연결에 필요한 userId 또는 conversationId가 없습니다.');
      return;
    }
    
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }
    
    const urlsToTry = getUrlsToTry();
    if (urlsToTry.length === 0) return;
    
    attemptedUrls.current = [urlsToTry[0]];
    socketRef.current = tryConnectWithUrl(urlsToTry[0]);
  }, [userId, conversationId, getUrlsToTry, tryConnectWithUrl]);
  
  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }
  }, []);
  
  const sendMessage = useCallback((content: string) => {
    if (!userId) {
      console.error('userId가 없습니다.');
      setError('사용자 정보가 없습니다');
      return false;
    }
    
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      console.error('WebSocket 연결 상태:', socketRef.current?.readyState);
      setError('연결이 활성화되지 않았습니다');
      
      if (!socketRef.current || 
          socketRef.current.readyState === WebSocket.CLOSED || 
          socketRef.current.readyState === WebSocket.CLOSING) {
        connect();
        return false;
      }
      return false;
    }
    
    try {
      const message = {
        conversationId,
        senderId: userId,
        content,
        sentAt: new Date().toISOString(),
      };
      
      console.log('메시지 전송:', {
        메시지: message,
        사용자ID: userId,
        소켓상태: socketRef.current?.readyState
      });
      socketRef.current.send(JSON.stringify(message));
      return true;
    } catch (err) {
      console.error('메시지 전송 오류:', err);
      setError('메시지를 전송할 수 없습니다');
      return false;
    }
  }, [conversationId, userId, connect]);
  
  useEffect(() => {
    if (userId && conversationId) {
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
  }, [connect, disconnect, userId, conversationId]);
  
  return {
    isConnected,
    error,
    sendMessage,
    connect,
    disconnect,
  };
};