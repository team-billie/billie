package com.nextdoor.nextdoor.domain.fintech.repository;
import com.nextdoor.nextdoor.domain.fintech.domain.RegistAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface RegistAccountRepository extends JpaRepository<RegistAccount, Long> {
    List<RegistAccount> findByUserId(Long userId);
    // 플랫폼 UserPK(Long userId) + SSAFY 계좌번호(accountNo:String) 조회
    Optional<RegistAccount> findByUserIdAndAccount_AccountNo(Long userId, String accountNo);
}