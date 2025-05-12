package com.nextdoor.nextdoor.domain.chat.application.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for member information needed by the chat domain
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberDto {
    /** Member ID */
    private Long id;
    
    /** Member nickname */
    private String nickname;
    
    /** Member profile image URL */
    private String profileImageUrl;
}