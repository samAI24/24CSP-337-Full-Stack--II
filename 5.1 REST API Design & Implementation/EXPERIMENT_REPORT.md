# College Lab Experiment 2.1.1: RESTful API Design & Layered Architecture

**Course Name**: Full Stack II  
**Course Code**: 24CSP-337  
**Experiment No**: 2.1.1  
**Project Name**: `blog-scheduler`  
**Student**: Sam Fawaz Hadi AL-Basara  
**UID**: 24BAI70236

---

## 1. Aim of the Experiment
To design, implement, and test a production-grade RESTful Web Service using **Spring Boot 3**, demonstrating **Layered Architecture**, **Bean Validation**, **Standardized Response Envelopes (`ApiResponse<T>`)**, **Global Exception Handling**, and **Cross-Origin Resource Sharing (CORS)** using an in-memory **H2 Database**.

---

## 2. Learning Objectives
1. **REST Architectural Principles**: Apply HTTP methods (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`), semantic URI resource naming conventions, and standard HTTP response status codes (`200 OK`, `201 Created`, `400 Bad Request`, `404 Not Found`).
2. **Layered Architecture Pattern**: Enforce strict separation of concerns across presentation (`controller`), business logic (`service`), data access (`repository`), domain (`entity`), data transfer (`dto`), and exception handling (`exception`).
3. **Bean Validation Framework**: Apply declarative constraint annotations (`@NotBlank`, `@Size`, `@NotNull`, `@Future`) on incoming request DTOs.
4. **Unified API Envelopes**: Wrap all API responses into a standard JSON payload format containing `success`, `message`, `data`, `errors`, and `timestamp`.
5. **Global Exception Handling**: Implement centralized exception handling using `@RestControllerAdvice` to translate runtime and validation exceptions into standardized error envelopes.
6. **Data Integrity & Relational Cascades**: Enforce foreign resource verification (verifying a post exists before scheduling) and cascading deletions (deleting schedules tied to a deleted post).
7. **CORS Security Configuration**: Configure CORS policies to allow cross-origin requests from frontend environments (`localhost:3000`, `localhost:5173`).

---

## 3. System Requirements
- **Java Development Kit (JDK)**: Java 17 or higher
- **Framework**: Spring Boot 3.3.5
- **Build Tool**: Apache Maven 3.8+ / Maven Wrapper (`./mvnw`)
- **Database**: H2 In-Memory Database (`jdbc:h2:mem:blogdb`)
- **Testing Tools**: cURL / Postman / Browser

## 3.1 Experiment Dashboard

The application includes a responsive dashboard at `http://localhost:8080/`. It provides a professional user interface for the experiment functionality while preserving the REST API and layered backend architecture:

- Create and edit posts with the same Bean Validation constraints as the API.
- Review post status, author, content, and update time.
- Delete posts and verify cascading deletion of linked schedules.
- Review schedules, update `PENDING`, `PUBLISHED`, or `CANCELLED` status, and remove schedules.
- View live post, scheduled-post, pending-job, and H2 connection summaries.

The dashboard is served from `src/main/resources/static` and communicates with `/api/posts` and `/api/schedules` using the standardized `ApiResponse<T>` envelope.

---

## 4. Architectural Design & Layering

```
com.cu.blogscheduler
├── BlogSchedulerApplication.java      # Entry Point & Startup Data Seeder
├── config
│   └── CorsConfig.java                # WebMvc CORS Policy Configuration
├── controller
│   ├── PostController.java            # Thin Controller for /api/posts
│   └── ScheduleController.java        # Thin Controller for /api/schedules
├── dto
│   ├── ApiResponse.java               # Standard JSON Response Envelope <T>
│   ├── PostRequestDto.java            # Bean Validation DTO for Posts
│   └── ScheduleRequestDto.java        # Bean Validation DTO for Schedules
├── entity
│   ├── Post.java                      # JPA Entity (posts table)
│   ├── Schedule.java                  # JPA Entity (schedules table)
│   └── ScheduleStatus.java            # Status Enum (PENDING, PUBLISHED, CANCELLED)
├── exception
│   ├── GlobalExceptionHandler.java    # @RestControllerAdvice Central Handler
│   └── ResourceNotFoundException.java # Runtime 404 Exception
├── repository
│   ├── PostRepository.java            # Spring Data JPA Repository for Post
│   └── ScheduleRepository.java        # Spring Data JPA Repository for Schedule
└── service
    ├── PostService.java               # Service Interface for Posts
    ├── PostServiceImpl.java           # Service Implementation (Cascade Deletes)
    ├── ScheduleService.java           # Service Interface for Schedules
    └── ScheduleServiceImpl.java       # Service Implementation (Post Existence Verification)
```

---

## 5. Lab Experiment Verification & Test Results

### Test Case 1: Fetch All Posts (GET /api/posts)
- **Request**: `GET http://localhost:8080/api/posts`
- **Expected Status**: `200 OK`
- **Response Payload**:
```json
{
  "success": true,
  "message": "Posts retrieved successfully",
  "data": [
    {
      "id": 1,
      "title": "Getting Started with Spring Boot 3 REST APIs",
      "content": "This sample post demonstrates layered architecture, Bean Validation, standardized response envelopes, and H2 database integration.",
      "author": "Lab Instructor",
      "createdAt": "2026-08-17T15:18:00",
      "updatedAt": "2026-08-17T15:18:00"
    }
  ],
  "errors": null,
  "timestamp": "2026-08-17T15:20:00"
}
```

### Test Case 2: Create a Valid Post (POST /api/posts)
- **Request**: `POST http://localhost:8080/api/posts`
- **Header**: `Content-Type: application/json`
- **Payload**:
```json
{
  "title": "REST Principles in Practice",
  "content": "Exploring standard status codes, Bean Validation, and standardized response envelopes.",
  "author": "Student Scholar"
}
```
- **Expected Status**: `201 Created`
- **Response Payload**:
```json
{
  "success": true,
  "message": "Post created successfully",
  "data": {
    "id": 2,
    "title": "REST Principles in Practice",
    "content": "Exploring standard status codes, Bean Validation, and standardized response envelopes.",
    "author": "Student Scholar",
    "createdAt": "2026-08-17T15:22:00",
    "updatedAt": "2026-08-17T15:22:00"
  },
  "errors": null,
  "timestamp": "2026-08-17T15:22:00"
}
```

### Test Case 3: Bean Validation Failure (POST /api/posts)
- **Request**: `POST http://localhost:8080/api/posts`
- **Payload**:
```json
{
  "title": "Hi",
  "content": "Too short",
  "author": ""
}
```
- **Expected Status**: `400 Bad Request`
- **Response Payload**:
```json
{
  "success": false,
  "message": "Validation failed",
  "data": null,
  "errors": [
    "title: Title must be between 3 and 120 characters",
    "content: Content must be at least 10 characters",
    "author: Author is required"
  ],
  "timestamp": "2026-08-17T15:23:00"
}
```

### Test Case 4: Create Schedule for Non-Existent Post (POST /api/schedules)
- **Request**: `POST http://localhost:8080/api/schedules`
- **Payload**:
```json
{
  "postId": 9999,
  "scheduledTime": "2026-12-31T23:59:59"
}
```
- **Expected Status**: `404 Not Found`
- **Response Payload**:
```json
{
  "success": false,
  "message": "Post not found with id: 9999",
  "data": null,
  "errors": null,
  "timestamp": "2026-08-17T15:24:00"
}
```

---

## 6. How to Execute the Project

Execute the command in your workspace directory terminal:

```bash
mvn spring-boot:run
```

Or using the Maven Wrapper:
```bash
./mvnw spring-boot:run
```
*(Windows PowerShell / CMD: `.\mvnw.cmd spring-boot:run`)*

---

## 7. Conclusion
The `blog-scheduler` REST API experiment successfully fulfills all lab objectives. It demonstrates high-quality Spring Boot 3 development practices including strict 4-tier layering, constructor-based dependency injection, declarative validation, standardized API envelope modeling, and global exception mapping.
