package com.nextdoor.nextdoor.domain.fintech.repository;

import com.nextdoor.nextdoor.domain.fintech.domain.RegistAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RegistAccountRepository extends JpaRepository<RegistAccount, Long> {
    // user.userKey 와 account.accountNo 로 조회
    Optional<RegistAccount> findByUser_UserKeyAndAccount_AccountNo(String userKey, String accountNo);

}
