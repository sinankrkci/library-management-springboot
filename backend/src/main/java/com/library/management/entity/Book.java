package com.library.management.entity;

import jakarta.persistence.*;
import lombok.Data;


@Data
@Table(name="book")
@Entity
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private long id;

    @Column(name="title")
    private String title;

    @Column(name="author")
    private String author;

    @Column(name="description")
    private String description;

    @Column(name="copies")
    private int copies;

    @Column(name="copies_available")
    private int copiesAvailable;

    @Column(name="category")
    private String category;

    private String img;


}
