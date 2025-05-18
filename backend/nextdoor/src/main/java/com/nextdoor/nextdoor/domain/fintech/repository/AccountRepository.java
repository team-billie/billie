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

    /** 회원(userKey)에 속한 모든 계좌 조회 */
    @EntityGraph(attributePaths = {"member"})
    List<Account> findByMember_UserKey(String userKey);

    /** 회원(userKey)의 특정 계좌(accountNo) 조회 */
    @EntityGraph(attributePaths = {"member"})
    Optional<Account> findByMember_UserKeyAndAccountNo(String userKey, String accountNo);

    /** ID(pk)로 계좌 조회 (member 정보도 함께 페치) */
    @Override
    @EntityGraph(attributePaths = {"member"})
    Optional<Account> findById(Long id);

    /** 회원(userKey)의 특정 타입(BILI_PAY, EXTERNAL 등) 계좌 조회 */
    @EntityGraph(attributePaths = {"member"})
    List<Account> findByMember_UserKeyAndAccountType(String userKey, RegistAccountType accountType);

    /** “등록된” 계좌만 필터링해서 조회 */
    @EntityGraph(attributePaths = {"member"})
    List<Account> findByMember_UserKeyAndRegisteredIsTrue(String userKey);
}
