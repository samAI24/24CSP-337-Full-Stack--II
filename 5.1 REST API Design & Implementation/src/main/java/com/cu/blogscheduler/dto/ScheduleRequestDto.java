package com.cu.blogscheduler.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public class ScheduleRequestDto {

    @NotNull(message = "Post ID is required")
    private Long postId;

    @NotNull(message = "Scheduled time is required")
    @Future(message = "Scheduled time must be in the future")
    private LocalDateTime scheduledTime;

    public ScheduleRequestDto() {
    }

    public ScheduleRequestDto(Long postId, LocalDateTime scheduledTime) {
        this.postId = postId;
        this.scheduledTime = scheduledTime;
    }

    // Getters and Setters
    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public LocalDateTime getScheduledTime() {
        return scheduledTime;
    }

    public void setScheduledTime(LocalDateTime scheduledTime) {
        this.scheduledTime = scheduledTime;
    }
}
