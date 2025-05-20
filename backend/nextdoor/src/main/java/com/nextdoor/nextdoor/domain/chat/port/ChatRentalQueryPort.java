package com.nextdoor.nextdoor.domain.chat.port;

import com.nextdoor.nextdoor.domain.chat.dto.RentalDto;

import java.util.Optional;

/**
 * Chat domain's port for querying rental information
 */
public interface ChatRentalQueryPort {

    /**
     * Find rental information by rental ID
     * @param rentalId the ID of the rental
     * @return Optional containing rental information if found
     */
    Optional<RentalDto> findById(Long rentalId);
}