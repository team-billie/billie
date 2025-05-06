package com.nextdoor.nextdoor.domain.s3store.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FileDeleteRequestDto {

    @NotBlank(message = "서비스 ID는 필수입니다.")
    private String serviceId;

    @NotBlank(message = "리소스 ID는 필수입니다.")
    private String resourceId;

    @NotBlank(message = "리소스 타입은 필수입니다.")
    private String resourceType;
}