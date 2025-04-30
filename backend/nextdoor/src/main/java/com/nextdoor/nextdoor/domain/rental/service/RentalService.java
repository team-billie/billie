package com.nextdoor.nextdoor.domain.rental.service;

import com.nextdoor.nextdoor.domain.rental.service.dto.UploadBeforeImageCommand;
import com.nextdoor.nextdoor.domain.rental.service.dto.UploadBeforeImageResult;
import org.springframework.stereotype.Service;

@Service
public interface RentalService {
    UploadBeforeImageResult registerBeforePhoto(UploadBeforeImageCommand command);
}
