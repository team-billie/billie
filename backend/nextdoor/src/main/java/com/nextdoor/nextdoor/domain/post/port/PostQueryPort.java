package com.nextdoor.nextdoor.domain.post.port;

import com.nextdoor.nextdoor.domain.post.service.dto.SearchPostCommand;
import com.nextdoor.nextdoor.domain.post.service.dto.SearchPostResult;
import org.springframework.data.domain.Page;

public interface PostQueryPort {

    /**
     * Search posts by user address
     * - Filters posts where Post.address matches Member.address for the given userId
     * - Includes like count from Post.likes
     * - Includes deal count from Rental entity where Rental.reservationId = Reservation.id and Reservation.feedId = Post.id
     */
    Page<SearchPostResult> searchPostsByUserAddress(SearchPostCommand command);
}