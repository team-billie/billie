package com.nextdoor.nextdoor.domain.fintech.repository;

import com.nextdoor.nextdoor.domain.fintech.domain.RegistAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RegistAccountRepository extends JpaRepository<RegistAccount, Long> {
    // userId로 등록된 계좌 전체 조회
    List<RegistAccount> findByUserId(Long userId);
}
