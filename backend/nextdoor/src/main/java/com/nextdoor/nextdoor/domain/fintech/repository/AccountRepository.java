package com.nextdoor.nextdoor.domain.fintech.repository;
import com.nextdoor.nextdoor.domain.fintech.domain.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {

    //계좌번호(accountNumber)로 단일 계좌 조회
    Optional<Account> findByAccountNumber(String accountNumber);
}
