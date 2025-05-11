package com.nextdoor.nextdoor.domain.auth.service;

import com.nextdoor.nextdoor.domain.auth.AuthMemberQueryPort;
import com.nextdoor.nextdoor.domain.auth.CustomOAuth2User;
import com.nextdoor.nextdoor.domain.auth.event.NewUserInfoObtainedEvent;
import com.nextdoor.nextdoor.domain.auth.exception.UnsupportedOAuth2ProviderException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@RequiredArgsConstructor
@Service
@Transactional
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final ApplicationEventPublisher applicationEventPublisher;

    private final AuthMemberQueryPort authMemberQueryPort;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        String authProvider = userRequest.getClientRegistration().getClientName();
        String nickname;
        switch (authProvider) {
            case "Kakao":
                Map<String, Object> kakaoAccount = (Map<String, Object>) oAuth2User.getAttributes().get("kakao_account");
                Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");
                nickname = (String) profile.get("nickname");
                break;
            default:
                throw new UnsupportedOAuth2ProviderException("지원하지 않는 OAuth2 제공자입니다.");
        }
        authMemberQueryPort.findByNickname(nickname).ifPresentOrElse(memberQueryDto -> {},
                () -> applicationEventPublisher.publishEvent(new NewUserInfoObtainedEvent(nickname)));
        return new CustomOAuth2User(nickname, oAuth2User.getAttributes());
    }
}
