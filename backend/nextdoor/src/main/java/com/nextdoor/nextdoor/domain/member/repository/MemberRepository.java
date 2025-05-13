package com.nextdoor.nextdoor.domain.member.repository;

import com.nextdoor.nextdoor.domain.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
}
