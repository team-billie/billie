package com.nextdoor.nextdoor.domain.rental.service;

import com.nextdoor.nextdoor.domain.rental.domain.Rental;
import com.nextdoor.nextdoor.domain.rental.event.UploadImageEvent;
import com.nextdoor.nextdoor.domain.rental.repository.RentalRepository;
import com.nextdoor.nextdoor.domain.rental.service.dto.UploadBeforeImageCommand;
import com.nextdoor.nextdoor.domain.rental.service.dto.UploadBeforeImageResult;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class RentalServiceImpl implements RentalService {

    private final RentalRepository rentalRepository;
    private final ApplicationEventPublisher eventPublisher;

    @Override
    @Transactional
    public UploadBeforeImageResult registerBeforePhoto(UploadBeforeImageCommand command) {


        eventPublisher.publishEvent(new UploadImageEvent(command.getFile()));
        return null;
    }
}
