package com.nextdoor.nextdoor.domain.auth.service;

import com.nextdoor.nextdoor.domain.auth.CustomOAuth2User;
import com.nextdoor.nextdoor.domain.auth.exception.UnsupportedOAuth2ProviderException;
import com.nextdoor.nextdoor.domain.auth.port.AuthFintechCommandPort;
import com.nextdoor.nextdoor.domain.auth.port.AuthMemberCommandPort;
import com.nextdoor.nextdoor.domain.auth.port.AuthMemberQueryPort;
import com.nextdoor.nextdoor.domain.auth.service.dto.MemberCommandDto;
import com.nextdoor.nextdoor.domain.auth.service.dto.MemberQueryDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@RequiredArgsConstructor
@Slf4j
@Service
@Transactional
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final AuthMemberCommandPort authMemberCommandPort;
    private final AuthMemberQueryPort authMemberQueryPort;
    private final AuthFintechCommandPort authFintechCommandPort;

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
            MemberQueryDto newMember = authMemberCommandPort.save(new MemberCommandDto(authProvider, nickname, email, profileImageUrl));
            long randomNumber = (long) (Math.random() * Long.MAX_VALUE);
            authFintechCommandPort.createUser(newMember.getId(), randomNumber + newMember.getEmail()).block();
            return newMember;
        });
        return new CustomOAuth2User(member.getId().toString(), oAuth2User.getAttributes());
    }
}
