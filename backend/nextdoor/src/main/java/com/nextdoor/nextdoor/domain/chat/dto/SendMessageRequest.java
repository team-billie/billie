package com.nextdoor.nextdoor.domain.chat.dto;

import lombok.*;

import jakarta.validation.constraints.NotBlank;

/**
 * REST API 메시지 전송 요청 바디
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SendMessageRequest {
    @NotBlank(message = "메시지 내용은 비어 있을 수 없습니다.")
    private String content;
}
