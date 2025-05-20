package com.nextdoor.nextdoor.domain.rental.job;

import com.nextdoor.nextdoor.domain.rental.service.RentalEndService;
import lombok.RequiredArgsConstructor;
import org.quartz.JobDataMap;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RentalEndJob extends QuartzJobBean {

    private final RentalEndService rentalEndService;

    @Override
    protected void executeInternal(JobExecutionContext context) throws JobExecutionException {
        JobDataMap dataMap = context.getJobDetail().getJobDataMap();
        Long rentalId = dataMap.getLong("rentalId");
        System.out.println("[DEBUG_LOG] RentalEndJob executing for rental ID: " + rentalId);
        rentalEndService.rentalEnd(rentalId);
    }
}
