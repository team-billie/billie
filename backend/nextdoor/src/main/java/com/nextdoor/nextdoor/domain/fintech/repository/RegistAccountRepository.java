package com.nextdoor.nextdoor.domain.fintech.repository;
import com.nextdoor.nextdoor.domain.fintech.domain.RegistAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RegistAccountRepository extends JpaRepository<RegistAccount, Long> {
    List<RegistAccount> findByUser_Id(Long userId);
}