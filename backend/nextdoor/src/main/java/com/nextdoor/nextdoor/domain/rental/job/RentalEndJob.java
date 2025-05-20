package com.nextdoor.nextdoor.domain.rental.job;

import com.nextdoor.nextdoor.domain.rental.service.RentalEndService;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.quartz.JobDataMap;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.springframework.stereotype.Component;

@Component
public class RentalEndJob extends QuartzJobBean {

    private RentalEndService rentalEndService;

    public RentalEndJob() {
    }

    @Autowired
    public RentalEndJob(RentalEndService rentalEndService) {
        this.rentalEndService = rentalEndService;
    }

    @Override
    protected void executeInternal(JobExecutionContext context) throws JobExecutionException {
        JobDataMap dataMap = context.getJobDetail().getJobDataMap();
        Long rentalId = dataMap.getLong("rentalId");
        System.out.println("[DEBUG_LOG] RentalEndJob executing for rental ID: " + rentalId);
        rentalEndService.rentalEnd(rentalId);
    }
}
