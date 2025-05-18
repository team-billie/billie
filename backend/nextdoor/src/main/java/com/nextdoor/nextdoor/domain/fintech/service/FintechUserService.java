package com.nextdoor.nextdoor.domain.fintech.service;

import com.nextdoor.nextdoor.domain.auth.port.AuthFintechCommandPort;
import com.nextdoor.nextdoor.domain.fintech.client.SsafyApiClient;
import com.nextdoor.nextdoor.domain.member.domain.Member;
import com.nextdoor.nextdoor.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.time.LocalDateTime;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class FintechUserService implements AuthFintechCommandPort {
    private final SsafyApiClient client;
    private final MemberRepository memberRepository;
    private final RegistAccountService regService;

    /**
     * 1) SSAFY API 로 user 생성
     * 2) DB 에 Member 저장
     * 3) 빌리페이(Account & RegistAccount)도 자동으로 생성
     */

    // 계정 생성 (빌리페이 생성도 같이함)
    public Mono<Map<String,Object>> createUser(Long userId, String ssafyApiEmail) {
        return client.createUser(userId, ssafyApiEmail)
                .flatMap(ssafyResp -> {
                    // SSAFY가 준 userKey 꺼내서 DB에 저장
                    String userKey = ssafyResp.get("userKey").toString();

                    // 2) 블로킹으로 Member 저장
                    return Mono.fromCallable(() -> {
                                Member member = Member.builder()
                                        .userKey(userKey)
                                        .email(ssafyApiEmail)
                                        .nickname("User" + userId) // Default nickname
                                        .build();
                                return memberRepository.save(member);
                            })
                            .subscribeOn(Schedulers.boundedElastic())

                            // 3) 저장이 끝나면 빌리페이 생성 → 그리고 원래 SSAFY 응답 Map 리턴
                            .then(regService.createBilipay(userKey))
                            .thenReturn(ssafyResp);
                });
    }
}
