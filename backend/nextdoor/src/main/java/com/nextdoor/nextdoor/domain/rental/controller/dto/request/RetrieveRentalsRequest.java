package com.nextdoor.nextdoor.domain.rental.controller.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RetrieveRentalsRequest {

    String userRole;
    String condition;
}
