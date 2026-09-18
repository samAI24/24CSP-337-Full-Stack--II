package com.cu.blogscheduler.repository;

import com.cu.blogscheduler.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    List<Schedule> findByPostId(Long postId);

    void deleteByPostId(Long postId);
}
