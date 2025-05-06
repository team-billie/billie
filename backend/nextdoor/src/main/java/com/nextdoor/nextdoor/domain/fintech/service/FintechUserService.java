package com.nextdoor.nextdoor.domain.fintech.service;

import com.nextdoor.nextdoor.domain.fintech.client.SsafyApiClient;
import com.nextdoor.nextdoor.domain.fintech.domain.FintechUser;
import com.nextdoor.nextdoor.domain.fintech.repository.FintechUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class FintechUserService {
    private final SsafyApiClient client;
    private final FintechUserRepository repo;

    // 계정 생성
    public Mono<FintechUser> createUser(String email, String apiKey) {
        return client.createAccount(apiKey, null, null) // 사용자 가입 API가 따로 있을 경우 호출
                .map(response -> {
                    String userKey = (String) response.get("userKey");
                    return FintechUser.builder()
                            .userKey(userKey)
                            .email(email)
                            .createdAt(LocalDateTime.now())
                            .build();
                })
                .flatMap(repo::save);
    }
}