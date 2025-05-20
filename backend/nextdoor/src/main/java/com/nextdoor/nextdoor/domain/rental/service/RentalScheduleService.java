package com.nextdoor.nextdoor.domain.rental.service;

import com.nextdoor.nextdoor.domain.rental.exception.RentalScheduleException;
import com.nextdoor.nextdoor.domain.rental.job.RentalEndJob;
import lombok.RequiredArgsConstructor;
import org.quartz.*;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class RentalScheduleService {

    private final Scheduler scheduler;

    public void scheduleRentalEnd(Long rentalId, LocalDate endDate) {
        try {
            JobDetail endJob = JobBuilder.newJob(RentalEndJob.class)
                    .withIdentity("rentalEndJob" + rentalId, "rentalJobs")
                    .usingJobData("rentalId", rentalId)
                    .build();

            //테스트 : 스케줄러 생성 20초 후에 실행
            Date runDateTime = new Date(System.currentTimeMillis() + 20 * 1000);

            Trigger endTrigger = TriggerBuilder.newTrigger()
                    .withIdentity("rentalEndTrigger_" + rentalId, "rentalTriggers")
                    .startAt(runDateTime)
                    .build();

            scheduler.scheduleJob(endJob, endTrigger);
        } catch (SchedulerException e) {
            throw new RentalScheduleException("대여 종료 스케줄 생성 실패", e);
        }
    }
}
