package com.nextdoor.nextdoor.domain.reservation.service;

import com.nextdoor.nextdoor.domain.reservation.service.dto.MemberDto;
import org.springframework.stereotype.Service;

@Service
public class TempReservationMemberQueryServiceImpl implements ReservationMemberQueryService {

    @Override
    public MemberDto findById(Long id) {
        return MemberDto.builder()
                .memberId(id)
                .name("Temp Member")
                .profileImageUrl("https://example.com")
                .build();
    }
}
