package com.nextdoor.nextdoor.domain.auth.service;

import com.nextdoor.nextdoor.domain.auth.CustomOAuth2User;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class JwtProvider {

    private static final String ISSUER = "nextdoor";
    private static final Key SECRET_KEY = Jwts.SIG.HS512.key().build();

    public String createAccessToken(Authentication authentication) {
        CustomOAuth2User userPrincipal = (CustomOAuth2User) authentication.getPrincipal();
        Date expiryDate = Date.from(Instant.now().plus(24, ChronoUnit.HOURS));
        return Jwts.builder()
                .signWith(SECRET_KEY)
                .subject(userPrincipal.getName())
                .issuer(ISSUER)
                .issuedAt(new Date())
                .expiration(expiryDate)
                .compact();
    }

    public String validateAndGetUserId(String token) {
        return Jwts.parser()
                .verifyWith((SecretKey) SECRET_KEY)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }
}

