package com.cu.blogscheduler.service;

import com.cu.blogscheduler.dto.ScheduleRequestDto;
import com.cu.blogscheduler.entity.Schedule;
import com.cu.blogscheduler.entity.ScheduleStatus;
import com.cu.blogscheduler.exception.ResourceNotFoundException;
import com.cu.blogscheduler.repository.PostRepository;
import com.cu.blogscheduler.repository.ScheduleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ScheduleServiceImpl implements ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final PostRepository postRepository;

    // Constructor injection
    public ScheduleServiceImpl(ScheduleRepository scheduleRepository, PostRepository postRepository) {
        this.scheduleRepository = scheduleRepository;
        this.postRepository = postRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Schedule> getAllSchedules() {
        return scheduleRepository.findAll();
    }

    @Override
    @Transactional
    public Schedule createSchedule(ScheduleRequestDto scheduleRequestDto) {
        Long postId = scheduleRequestDto.getPostId();
        // Verify referenced post exists
        if (!postRepository.existsById(postId)) {
            throw new ResourceNotFoundException("Post not found with id: " + postId);
        }

        Schedule schedule = new Schedule(
                postId,
                scheduleRequestDto.getScheduledTime(),
                ScheduleStatus.PENDING
        );
        return scheduleRepository.save(schedule);
    }

    @Override
    @Transactional
    public Schedule updateScheduleStatus(Long id, ScheduleStatus status) {
        Schedule schedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Schedule not found with id: " + id));
        schedule.setStatus(status);
        return scheduleRepository.save(schedule);
    }

    @Override
    @Transactional
    public void deleteSchedule(Long id) {
        Schedule schedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Schedule not found with id: " + id));
        scheduleRepository.delete(schedule);
    }
}
