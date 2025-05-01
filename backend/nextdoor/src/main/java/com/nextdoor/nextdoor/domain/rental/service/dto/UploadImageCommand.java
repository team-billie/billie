package com.nextdoor.nextdoor.domain.rental.service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@AllArgsConstructor
public class UploadImageCommand {
    private Long rentalId;
    private MultipartFile file;
}
