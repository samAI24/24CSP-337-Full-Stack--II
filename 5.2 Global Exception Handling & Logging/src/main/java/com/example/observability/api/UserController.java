package com.example.observability.api;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

import com.example.observability.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ApiResponse<?> getUsers() {
        log.info("event=users_listed count={}", userService.findAll().size());
        return new ApiResponse<>(true, "Users loaded successfully", userService.findAll());
    }

    @GetMapping("/{uid}")
    public ApiResponse<User> getUser(@PathVariable String uid) {
        return new ApiResponse<>(true, "User found", userService.findByUid(uid));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<User>> createUser(@Valid @RequestBody UserRequest request) {
        User user = userService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(true, "User created successfully", user));
    }

    @PutMapping("/{uid}")
    public ApiResponse<User> updateUser(@PathVariable String uid,
                                        @Valid @RequestBody UserRequest request) {
        return new ApiResponse<>(true, "User updated successfully", userService.update(uid, request));
    }

    @DeleteMapping("/{uid}")
    public ApiResponse<Void> deleteUser(@PathVariable String uid) {
        userService.delete(uid);
        return new ApiResponse<>(true, "User deleted successfully", null);
    }
}
