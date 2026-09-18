package com.cu.blogscheduler.service;

import com.cu.blogscheduler.dto.ScheduleRequestDto;
import com.cu.blogscheduler.entity.Schedule;
import com.cu.blogscheduler.entity.ScheduleStatus;

import java.util.List;

public interface ScheduleService {

    List<Schedule> getAllSchedules();

    Schedule createSchedule(ScheduleRequestDto scheduleRequestDto);

    Schedule updateScheduleStatus(Long id, ScheduleStatus status);

    void deleteSchedule(Long id);
}
