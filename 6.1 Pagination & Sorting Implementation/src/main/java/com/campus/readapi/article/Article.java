package com.campus.readapi.article;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "articles")
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String category;
    private String author;
    private int readTime;
    private int views;
    private LocalDate publishedOn;

    protected Article() {
    }

    public Article(String title, String category, String author, int readTime, int views, LocalDate publishedOn) {
        this.title = title;
        this.category = category;
        this.author = author;
        this.readTime = readTime;
        this.views = views;
        this.publishedOn = publishedOn;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getCategory() { return category; }
    public String getAuthor() { return author; }
    public int getReadTime() { return readTime; }
    public int getViews() { return views; }
    public LocalDate getPublishedOn() { return publishedOn; }
}
