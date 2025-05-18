package com.nextdoor.nextdoor.domain.fintech.repository;
import com.nextdoor.nextdoor.domain.fintech.domain.Account;
import com.nextdoor.nextdoor.domain.fintech.domain.RegistAccountType;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {

    //계좌번호(accountNo)로 단일 계좌 조회
    Optional<Account> findByAccountNo(String accountN);

    // 계좌 등록 api => 계좌번호 + 은행코드로 조회
    Optional<Account> findByAccountNoAndBankCode(String accountNo, String bankCode);

    // 사용자의 모든 계좌 조회
    @EntityGraph(attributePaths = {"member"})
    List<Account> findByMember_UserKey(String userKey);

    // 사용자의 특정 계좌 조회
    @EntityGraph(attributePaths = {"member"})
    Optional<Account> findByMember_UserKeyAndAccountNo(String userKey, String accountNo);

    // ID로 계좌 조회 (eager loading)
    @Override
    @EntityGraph(attributePaths = {"member"})
    Optional<Account> findById(Long id);

    // 사용자의 특정 타입 계좌 조회
    @EntityGraph(attributePaths = {"member"})
    List<Account> findByMember_UserKeyAndAccountType(String userKey, RegistAccountType accountType);
}
