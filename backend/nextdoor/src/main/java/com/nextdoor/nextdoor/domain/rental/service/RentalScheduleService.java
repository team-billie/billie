package com.nextdoor.nextdoor.domain.rental.service;

import com.nextdoor.nextdoor.domain.rental.job.RentalEndJob;
import lombok.RequiredArgsConstructor;
import org.quartz.*;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class RentalScheduleService {

    private final Scheduler scheduler;

    public void scheduleRentalEnd(Long rentalId, Date endDate) {
        try{
            JobDetail endJob = JobBuilder.newJob(RentalEndJob.class)
                    .withIdentity("rentalEndJob" + rentalId, "rentalJobs")
                    .usingJobData("rentalId", rentalId)
                    .build();

            Trigger endTrigger = TriggerBuilder.newTrigger()
                    .withIdentity("rentalEndTrigger_" + rentalId, "rentalTriggers")
                    .startAt(endDate)
                    .build();

            scheduler.scheduleJob(endJob, endTrigger);
        } catch (SchedulerException e) {
            throw new IllegalArgumentException("대여 종료 스케줄 생성 실패");
        }
    }
}
