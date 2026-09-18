package com.cu.blogscheduler.service;

import com.cu.blogscheduler.dto.PostRequestDto;
import com.cu.blogscheduler.entity.Post;

import java.util.List;

public interface PostService {

    List<Post> getAllPosts();

    Post getPostById(Long id);

    Post createPost(PostRequestDto postRequestDto);

    Post updatePost(Long id, PostRequestDto postRequestDto);

    void deletePost(Long id);
}
