package com.cu.blogscheduler.service;

import com.cu.blogscheduler.dto.PostRequestDto;
import com.cu.blogscheduler.entity.Post;
import com.cu.blogscheduler.entity.PostStatus;
import com.cu.blogscheduler.exception.ResourceNotFoundException;
import com.cu.blogscheduler.repository.PostRepository;
import com.cu.blogscheduler.repository.ScheduleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final ScheduleRepository scheduleRepository;

    // Constructor injection
    public PostServiceImpl(PostRepository postRepository, ScheduleRepository scheduleRepository) {
        this.postRepository = postRepository;
        this.scheduleRepository = scheduleRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Post getPostById(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + id));
    }

    @Override
    @Transactional
    public Post createPost(PostRequestDto postRequestDto) {
        Post post = new Post(
                postRequestDto.getTitle(),
                postRequestDto.getContent(),
                postRequestDto.getAuthor()
        );
        
        // Set status based on scheduledAt
        if (postRequestDto.getScheduledAt() != null) {
            post.setScheduledAt(postRequestDto.getScheduledAt());
            post.setStatus(PostStatus.SCHEDULED);
        } else {
            post.setStatus(PostStatus.DRAFT);
        }
        
        return postRepository.save(post);
    }

    @Override
    @Transactional
    public Post updatePost(Long id, PostRequestDto postRequestDto) {
        Post post = getPostById(id);
        post.setTitle(postRequestDto.getTitle());
        post.setContent(postRequestDto.getContent());
        post.setAuthor(postRequestDto.getAuthor());
        
        // Update scheduledAt and status if provided
        if (postRequestDto.getScheduledAt() != null) {
            post.setScheduledAt(postRequestDto.getScheduledAt());
            post.setStatus(PostStatus.SCHEDULED);
        } else {
            post.setScheduledAt(null);
            post.setStatus(PostStatus.DRAFT);
        }
        
        return postRepository.save(post);
    }

    @Override
    @Transactional
    public void deletePost(Long id) {
        Post post = getPostById(id);
        // Cascading deletion: remove all schedules tied to this post first
        scheduleRepository.deleteByPostId(post.getId());
        // Remove post
        postRepository.delete(post);
    }
}
