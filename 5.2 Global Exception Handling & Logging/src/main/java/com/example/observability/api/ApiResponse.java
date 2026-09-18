package com.example.observability.api;

public record ApiResponse<T>(boolean success, String message, T data) {
}
