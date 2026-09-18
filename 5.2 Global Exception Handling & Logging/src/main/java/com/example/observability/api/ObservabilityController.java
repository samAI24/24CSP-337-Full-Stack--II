package com.example.observability.api;

import com.example.observability.exception.ResourceNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ObservabilityController {

    private static final Logger log = LoggerFactory.getLogger(ObservabilityController.class);

    @GetMapping("/health")
    public Map<String, Object> health() {
        log.info("event=health_check result=UP");
        return Map.of("status", "UP", "service", "observability-lab", "timestamp", Instant.now());
    }

    @GetMapping("/items/{id}")
    public Map<String, Object> getItem(@PathVariable int id) {
        if (id == 404) {
            throw new ResourceNotFoundException("Item 404 was not found");
        }
        log.info("event=item_loaded itemId={}", id);
        return Map.of("id", id, "name", "Traceable demo item", "state", "available");
    }
}