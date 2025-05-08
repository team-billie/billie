package com.nextdoor.nextdoor.domain.fintech.service;

import com.nextdoor.nextdoor.domain.fintech.client.SsafyApiClient;
import com.nextdoor.nextdoor.domain.fintech.domain.FintechUser;
import com.nextdoor.nextdoor.domain.fintech.repository.FintechUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class FintechUserService {
    private final SsafyApiClient client;
    private final FintechUserRepository repo;

    // 계정 생성
    public Mono<Map<String,Object>> createUser(Long userId) {
        return client.createUser(userId)
                .map(ssafyResp -> {
                    // SSAFY가 준 userKey 꺼내서 DB에 저장
                    String userKey = ssafyResp.get("userKey").toString();
                    FintechUser u = new FintechUser(userKey, userId, LocalDateTime.now());
                    repo.save(u);  // 블로킹 저장
                    return ssafyResp;  // 원본 Map 그대로 리턴
                });
    }
}