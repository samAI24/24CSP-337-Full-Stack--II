# Experiment 2.2.1 - Pagination and Sorting REST API

**Student:** Sam Fawaz Hadi AL-Basara  
**UID:** UID-24BAI70236  
**Course:** Full Stack - II

This Spring Boot experiment demonstrates scalable read APIs for large datasets using Spring Data `Pageable`. The application exposes a sortable article catalogue backed by an in-memory H2 database and includes a responsive visual explorer.

## Aim and outcomes

- Implement paginated and sortable REST API responses.
- Use Spring Data `Pageable` for efficient data retrieval.
- Compare page size and sort order through a working browser interface.
- Observe response metadata including total elements, total pages, first page, and last page.

The experiment maps to CO3 - BT3 and CO4 - BT4.

## Run

Requirements: JDK 17+ and Maven 3.9+.

```powershell
.tools\apache-maven-3.9.11\bin\mvn.cmd spring-boot:run
```

Open http://localhost:8080.

## API examples

```text
GET /api/articles?page=0&size=6&sort=publishedOn,desc
GET /api/articles?page=1&size=4&sort=views,desc
GET /api/articles?page=0&size=8&sort=title,asc
```

The endpoint returns Spring Data's `Page<Article>` metadata alongside the current page content. The H2 database is in-memory and is seeded at startup with 12 articles.

The browser explorer supports page sizes of 4, 6, 8, or 12 and sorting by publication date, views, reading time, or title. The previous/next controls and numbered page buttons update the API request directly.
