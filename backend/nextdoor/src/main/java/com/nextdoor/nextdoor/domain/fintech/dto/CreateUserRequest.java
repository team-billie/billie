package com.nextdoor.nextdoor.domain.fintech.dto;

import lombok.Data;

@Data
public class CreateUserRequest {
    private String email;
    private String apiKey;
}