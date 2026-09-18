package com.cu.blogscheduler;

import com.cu.blogscheduler.entity.Post;
import com.cu.blogscheduler.entity.Schedule;
import com.cu.blogscheduler.entity.ScheduleStatus;
import com.cu.blogscheduler.repository.PostRepository;
import com.cu.blogscheduler.repository.ScheduleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDateTime;

@SpringBootApplication
public class BlogSchedulerApplication {

    public static void main(String[] args) {
        SpringApplication.run(BlogSchedulerApplication.class, args);
    }

    @Bean
    public CommandLineRunner seedData(PostRepository postRepository, ScheduleRepository scheduleRepository) {
        return args -> {
            // Seed initial sample Post
            Post samplePost = new Post(
                    "Getting Started with Spring Boot 3 REST APIs",
                    "This sample post demonstrates layered architecture, Bean Validation, standardized response envelopes, and H2 database integration.",
                    "Lab Instructor"
            );
            Post savedPost = postRepository.save(samplePost);

            // Seed initial sample Schedule
            Schedule sampleSchedule = new Schedule(
                    savedPost.getId(),
                    LocalDateTime.now().plusDays(2),
                    ScheduleStatus.PENDING
            );
            scheduleRepository.save(sampleSchedule);

            System.out.println(">>> Sample Post and Schedule seeded successfully! <<<");
        };
    }
}
