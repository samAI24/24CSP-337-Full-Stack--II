package com.cu.blogscheduler.controller;

import com.cu.blogscheduler.dto.ApiResponse;
import com.cu.blogscheduler.dto.PostRequestDto;
import com.cu.blogscheduler.entity.Post;
import com.cu.blogscheduler.service.PostService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    // Constructor injection
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Post>>> getAllPosts() {
        List<Post> posts = postService.getAllPosts();
        return ResponseEntity.ok(ApiResponse.success("Posts retrieved successfully", posts));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Post>> getPostById(@PathVariable Long id) {
        Post post = postService.getPostById(id);
        return ResponseEntity.ok(ApiResponse.success("Post retrieved successfully", post));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Post>> createPost(@Valid @RequestBody PostRequestDto postRequestDto) {
        Post createdPost = postService.createPost(postRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Post created successfully", createdPost));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Post>> updatePost(@PathVariable Long id,
                                                         @Valid @RequestBody PostRequestDto postRequestDto) {
        Post updatedPost = postService.updatePost(id, postRequestDto);
        return ResponseEntity.ok(ApiResponse.success("Post updated successfully", updatedPost));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.ok(ApiResponse.success("Post deleted successfully", null));
    }
}
