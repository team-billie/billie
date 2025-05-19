package com.nextdoor.nextdoor.domain.chat.port;

import com.nextdoor.nextdoor.domain.chat.dto.ReservationDto;

import java.util.Optional;

/**
 * Chat domain's port for querying reservation information
 */
public interface ChatReservationQueryPort {

    /**
     * Find reservation information by post ID and owner ID
     * @param postId the ID of the post
     * @param ownerId the ID of the owner
     * @param renterId the ID of the renter
     * @return Optional containing reservation information if found
     */
    Optional<ReservationDto> findByPostIdAndOwnerIdAndRenterId(Long postId, Long ownerId, Long renterId);
}