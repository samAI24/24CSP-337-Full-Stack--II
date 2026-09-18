package com.example.observability.api;

import jakarta.validation.constraints.NotBlank;

public record UserRequest(
        @NotBlank(message = "UID is required") String uid,
        @NotBlank(message = "Name is required") String name) {
}
