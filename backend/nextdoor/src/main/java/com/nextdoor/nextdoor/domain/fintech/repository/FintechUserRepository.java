package com.nextdoor.nextdoor.domain.fintech.repository;

import com.nextdoor.nextdoor.domain.fintech.domain.FintechUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FintechUserRepository extends JpaRepository<FintechUser, String> {
    //내부 PK(renterId)를 통해 FintechUser의 SSAFY userKey를 조회합니다.
    Optional<FintechUser> findByUserId(Long userId);
}