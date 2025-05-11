package com.nextdoor.nextdoor.config;

import com.nextdoor.nextdoor.domain.auth.OAuth2AuthorizationRequestBasedOnCookieRepository;
import com.nextdoor.nextdoor.domain.auth.filter.JwtAuthenticationFilter;
import com.nextdoor.nextdoor.domain.auth.filter.RedirectUrlCookieFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestRedirectFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.filter.CorsFilter;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final OAuth2AuthorizationRequestBasedOnCookieRepository oAuth2AuthorizationRequestBasedOnCookieRepository;

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final RedirectUrlCookieFilter redirectUrlCookieFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .httpBasic(httpBasic -> httpBasic.disable())
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(httpRequest -> httpRequest
                        .requestMatchers(
                                "/api/v1/auth"
                        ).permitAll()
                        // TODO OAuth2 구현 후 아래 줄 수정
                        .anyRequest().permitAll())
                .oauth2Login(oauth2 -> oauth2
                        .redirectionEndpoint(redirection -> redirection
                                .baseUri("/api/v1/auth/login/oauth2/code/*"))
                        .authorizationEndpoint(authorization -> authorization
                                .baseUri("/api/v1/auth/authorize")
                                .authorizationRequestRepository(oAuth2AuthorizationRequestBasedOnCookieRepository)))
                .oauth2Client(Customizer.withDefaults())
                .addFilterAfter(jwtAuthenticationFilter, CorsFilter.class)
                .addFilterBefore(redirectUrlCookieFilter, OAuth2AuthorizationRequestRedirectFilter.class)
                .build();
    }
}
