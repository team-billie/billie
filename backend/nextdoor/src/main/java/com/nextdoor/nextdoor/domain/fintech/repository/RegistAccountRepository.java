package com.nextdoor.nextdoor.domain.fintech.repository;

import com.nextdoor.nextdoor.domain.fintech.domain.RegistAccount;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RegistAccountRepository extends JpaRepository<RegistAccount, Long> {
    // 등록된 계좌 전체 조회
    @EntityGraph(attributePaths = {"account"})
    List<RegistAccount> findByUser_UserKey(String userKey);

    // user.userKey 와 account.accountNo 로 조회 ,  등록된 계좌 1개를 찾는거임
    @EntityGraph(attributePaths = {"account"})
    Optional<RegistAccount> findByUser_UserKeyAndAccount_AccountNo(String userKey, String accountNo);

}
