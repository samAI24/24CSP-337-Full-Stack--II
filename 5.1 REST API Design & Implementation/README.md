# Blog Scheduler - Spring Boot 3 REST API

> **College Lab Experiment 2.1.1**: REST principles, layered architecture, Bean Validation, standardized responses, and CORS configuration.

**Student:** Sam Fawaz Hadi AL-Basara  
**UID:** 24BAI70236

## Experiment Dashboard

The project includes a responsive browser dashboard for the complete experiment workflow. Start the application and open [http://localhost:8080/](http://localhost:8080/) to create, edit, delete, and review posts; schedule existing posts; update schedule status; and view live H2-backed metrics. The interface is served directly by Spring Boot from `src/main/resources/static` and uses the same REST API and standardized response envelopes documented below.

---

## How to Run (Auto-Setup Maven)

Run this command in your terminal:

```cmd
.\run.bat
```

*(This automatically downloads a portable local Maven instance into `.maven/` if `mvn` is missing, and starts Spring Boot!)*

---

## H2 Console & API Endpoints

Once running:
- **Experiment dashboard**: [http://localhost:8080/](http://localhost:8080/)
- **Posts API**: [http://localhost:8080/api/posts](http://localhost:8080/api/posts)
- **Schedules API**: [http://localhost:8080/api/schedules](http://localhost:8080/api/schedules)
- **H2 Database Web Console**: [http://localhost:8080/h2-console](http://localhost:8080/h2-console)
  - **JDBC URL**: `jdbc:h2:mem:blogdb`
  - **User Name**: `sa`
  - **Password**: *(leave blank)*

---

## Lab Report & Full Documentation

See [EXPERIMENT_REPORT.md](file:///c:/Users/samal/OneDrive/Desktop/CU/Third%20Year/5%20Semester%2024AIT_NTPP-2/24CSP-337%20%20Full%20Stack%20-II/5.1/EXPERIMENT_REPORT.md) for the complete experiment report including aim, objectives, architecture, test cases, and sample JSON payloads.
