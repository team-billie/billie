package com.nextdoor.nextdoor.domain.fintech.repository;

import com.nextdoor.nextdoor.domain.fintech.domain.FintechUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FintechUserRepository extends JpaRepository<FintechUser, String> {}