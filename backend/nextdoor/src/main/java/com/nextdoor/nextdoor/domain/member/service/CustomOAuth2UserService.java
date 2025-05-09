package com.nextdoor.nextdoor.domain.member.service;


import com.nextdoor.nextdoor.domain.member.ApplicationOAuth2User;
import lombok.RequiredArgsConstructor;
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

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        String authProvider = userRequest.getClientRegistration().getClientName();
        String email, username;
        switch (authProvider) {
            case "GitHub":
                email = "";
                username = (String) oAuth2User.getAttributes().get("login");
                break;
            case "Google":
                email = (String) oAuth2User.getAttributes().get("email");
                username = (String) oAuth2User.getAttributes().get("name");
                break;
            case "Kakao":
                Map<String, Object> kakaoAccount = (Map<String, Object>) oAuth2User.getAttributes().get("kakao_account");
                email = (String) kakaoAccount.get("email");
                Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");
                username = (String) profile.get("nickname");
                break;
            case "Naver":
                Map<String, Object> response = (Map<String, Object>) oAuth2User.getAttributes().get("response");
                email = (String) response.get("email");
                username = (String) response.get("name");
                break;
            default:
                email = "";
                username = "";
        }
        // TODO memberRepository에 저장
        // TODO 아래 내용 수정
        return new ApplicationOAuth2User("1", oAuth2User.getAttributes());
    }

}
