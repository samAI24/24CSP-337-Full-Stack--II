# Experiment 5.2: Observable User Registry

**Student:** Sam Fawaz Hadi AL-Basara  
**UID:** 24BAI70236

This Spring Boot 3 application continues the Experiment 5.1 project with a complete in-memory user registry and the observability requirements from Experiment 2.1.2.

## Features

- `@RestControllerAdvice` returns one consistent `ApiError` response shape.
- `CorrelationIdFilter` accepts or creates `X-Correlation-ID`, puts it into SLF4J MDC, and echoes it back.
- Structured key-value request logs include method, path, status, duration, and correlation ID.
- Centralized validation, not-found, duplicate-user, and unexpected-error handling.
- User CRUD and search endpoints under `/api/users`.
- A responsive browser dashboard at `http://localhost:8080` exercises every user operation and the controlled 404 response.

## Run

Requires JDK 17+ and Maven 3.9+.

```text
mvn spring-boot:run
```

Try `GET /api/health`, `GET /api/users`, `GET /api/users/24BAI70236`, and the controlled failure `GET /api/users/NOT-FOUND-404`.

## User API

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/users` | List users |
| `GET` | `/api/users/{uid}` | Search one user |
| `POST` | `/api/users` | Add a user with `{ "uid": "...", "name": "..." }` |
| `PUT` | `/api/users/{uid}` | Update a user's name |
| `DELETE` | `/api/users/{uid}` | Delete a user |