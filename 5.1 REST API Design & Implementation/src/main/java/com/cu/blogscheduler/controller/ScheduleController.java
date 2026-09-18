package com.cu.blogscheduler.controller;

import com.cu.blogscheduler.dto.ApiResponse;
import com.cu.blogscheduler.dto.ScheduleRequestDto;
import com.cu.blogscheduler.entity.Schedule;
import com.cu.blogscheduler.entity.ScheduleStatus;
import com.cu.blogscheduler.service.ScheduleService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/schedules")
public class ScheduleController {

    private final ScheduleService scheduleService;

    // Constructor injection
    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Schedule>>> getAllSchedules() {
        List<Schedule> schedules = scheduleService.getAllSchedules();
        return ResponseEntity.ok(ApiResponse.success("Schedules retrieved successfully", schedules));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Schedule>> createSchedule(@Valid @RequestBody ScheduleRequestDto scheduleRequestDto) {
        Schedule createdSchedule = scheduleService.createSchedule(scheduleRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Schedule created successfully", createdSchedule));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<Schedule>> updateScheduleStatus(@PathVariable Long id,
                                                                       @RequestParam("value") ScheduleStatus value) {
        Schedule updatedSchedule = scheduleService.updateScheduleStatus(id, value);
        return ResponseEntity.ok(ApiResponse.success("Schedule status updated successfully", updatedSchedule));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteSchedule(@PathVariable Long id) {
        scheduleService.deleteSchedule(id);
        return ResponseEntity.ok(ApiResponse.success("Schedule deleted successfully", null));
    }
}
