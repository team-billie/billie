package com.nextdoor.nextdoor.domain.rental.controller.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@Builder
public class UploadImageRequest {

    @NotNull(message = "이미지 파일은 필수입니다.")
    private MultipartFile file;
}
