package com.nextdoor.nextdoor.domain.s3store.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FileUploadRequestDto {

    @NotNull(message = "파일은 필수입니다.")
    private MultipartFile file;

    @NotBlank(message = "서비스 ID는 필수입니다.")
    private String serviceId;

    @NotBlank(message = "리소스 ID는 필수입니다.")
    private String resourceId;

    @NotBlank(message = "리소스 타입은 필수입니다.")
    private String resourceType;

    private String directory;  // 선택적 디렉토리 경로 (ex: users/profile)
}