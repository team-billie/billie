package com.nextdoor.nextdoor.domain.auth.service;

import com.nextdoor.nextdoor.domain.auth.CustomOAuth2User;
import com.nextdoor.nextdoor.domain.auth.exception.UnsupportedOAuth2ProviderException;
import com.nextdoor.nextdoor.domain.auth.port.AuthFintechCommandPort;
import com.nextdoor.nextdoor.domain.auth.port.AuthMemberCommandPort;
import com.nextdoor.nextdoor.domain.auth.port.AuthMemberQueryPort;
import com.nextdoor.nextdoor.domain.auth.service.dto.MemberCommandDto;
import com.nextdoor.nextdoor.domain.auth.service.dto.MemberQueryDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;
import org.springframework.transaction.support.TransactionSynchronizationAdapter;
import org.springframework.transaction.support.TransactionSynchronizationManager;

import java.util.Map;
import java.util.concurrent.CompletableFuture;

@RequiredArgsConstructor
@Slf4j
@Service
@Transactional
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final AuthMemberCommandPort authMemberCommandPort;
    private final AuthMemberQueryPort authMemberQueryPort;
    private final AuthFintechCommandPort authFintechCommandPort;
    private final ApplicationEventPublisher eventPublisher;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        String authProvider = userRequest.getClientRegistration().getClientName();
        String nickname, email, profileImageUrl;
        switch (authProvider) {
            case "Kakao":
                Map<String, Object> kakaoAccount = (Map<String, Object>) oAuth2User.getAttributes().get("kakao_account");
                Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");
                nickname = (String) profile.get("nickname");
                email = (String) kakaoAccount.get("email");
                profileImageUrl = (String) profile.get("profile_image_url");
                break;
            default:
                throw new UnsupportedOAuth2ProviderException("지원하지 않는 OAuth2 제공자입니다.");
        }
        MemberQueryDto member = authMemberQueryPort.findByEmailAndAuthProvider(email, authProvider).orElseGet(() -> {
            // 새 멤버 저장
            MemberQueryDto newMember = authMemberCommandPort.save(new MemberCommandDto(authProvider, nickname, email, profileImageUrl));

            // 이벤트 발행
            long randomNumber = (long) (Math.random() * Long.MAX_VALUE);
            eventPublisher.publishEvent(new MemberCreatedEvent(newMember.getId(),
                    randomNumber + newMember.getEmail()));

            return newMember;
        });

        return new CustomOAuth2User(member.getId().toString(), oAuth2User.getAttributes());

    }

    @EventListener
    @Async
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void handleMemberCreatedEvent(MemberCreatedEvent event) {
        try {
            authFintechCommandPort.createUser(event.getMemberId(), event.getEmail()).block();
            log.info("Fintech 사용자 생성 성공: memberId={}", event.getMemberId());
        } catch (Exception e) {
            log.error("Fintech 사용자 생성 실패: memberId={}, 오류={}", event.getMemberId(), e.getMessage(), e);
        }
    }

    // 이벤트 클래스 정의
    @Getter
    @AllArgsConstructor
    public static class MemberCreatedEvent {
        private final Long memberId;
        private final String email;
    }
}
