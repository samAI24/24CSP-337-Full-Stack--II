package com.campus.readapi.article;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.time.LocalDate;
import java.util.List;

@Configuration
public class DataSeeder {
    @Bean
    CommandLineRunner seedArticles(ArticleRepository repository) {
        return args -> {
            if (repository.count() > 0) return;
            repository.saveAll(List.of(
                new Article("Designing APIs that age well", "Architecture", "Maya Patel", 8, 2840, LocalDate.of(2025, 2, 18)),
                new Article("The quiet power of database indexes", "Data", "Arjun Mehta", 6, 3190, LocalDate.of(2025, 2, 12)),
                new Article("Pagination patterns for busy products", "Performance", "Nora Williams", 10, 4520, LocalDate.of(2025, 2, 4)),
                new Article("A field guide to clean controllers", "Spring Boot", "Devon Lee", 5, 1980, LocalDate.of(2025, 1, 28)),
                new Article("Making query parameters feel human", "API Design", "Sana Rahman", 7, 2670, LocalDate.of(2025, 1, 21)),
                new Article("How caching changes the conversation", "Performance", "Leo Chen", 9, 3760, LocalDate.of(2025, 1, 15)),
                new Article("The shape of a useful response", "API Design", "Maya Patel", 4, 1540, LocalDate.of(2025, 1, 9)),
                new Article("H2 to production: what changes", "Data", "Arjun Mehta", 11, 2310, LocalDate.of(2025, 1, 3)),
                new Article("Readable errors, happier clients", "Spring Boot", "Nora Williams", 6, 1820, LocalDate.of(2024, 12, 22)),
                new Article("Measuring the cost of a request", "Architecture", "Devon Lee", 8, 2940, LocalDate.of(2024, 12, 15)),
                new Article("Streams, pages, and the network", "Performance", "Sana Rahman", 7, 3410, LocalDate.of(2024, 12, 7)),
                new Article("REST endpoints as small contracts", "Architecture", "Leo Chen", 5, 2130, LocalDate.of(2024, 11, 29))
            ));
        };
    }
}
