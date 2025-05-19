package com.nextdoor.nextdoor.domain.chat.service;

import com.nextdoor.nextdoor.domain.chat.domain.UnreadCounter;
import com.nextdoor.nextdoor.domain.chat.domain.UnreadCounterKey;
import com.nextdoor.nextdoor.domain.chat.infrastructure.persistence.UnreadCounterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Cassandra Counter를 이용한 미확인 메시지 집계 로직
 */
@Service
@RequiredArgsConstructor
@Transactional
public class UnreadCounterService {
    private final UnreadCounterRepository repository;

    /** 채팅 수신 시 해당 유저의 미확인 카운트 1 증가 */
    public void increase(Long roomId, Long userId) {
        var key = new UnreadCounterKey(roomId, userId);
        var counter = UnreadCounter.builder()
                .key(key)
                .unreadCount(1L)
                .build();
        repository.save(counter);
    }

    /** 사용자가 방 내역 열람 시 미확인 카운트 초기화 */
    public void reset(Long roomId, Long userId) {
        repository.deleteById(new UnreadCounterKey(roomId, userId));
    }

    /** 특정 유저의 미확인 메시지 개수 조회 */
    @Transactional(readOnly = true)
    public long getCount(Long roomId, Long userId) {
        return repository.findById(new UnreadCounterKey(roomId, userId))
                .map(UnreadCounter::getUnreadCount)
                .orElse(0L);
    }
}
