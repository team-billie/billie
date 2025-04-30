package com.nextdoor.nextdoor.domain.rental.controller.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@AllArgsConstructor
public class UploadBeforeImageRequest {

    private MultipartFile file;
}
