package com.library.management.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Data
@Table(name="book")
@Entity
@Getter
@Setter
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    @JsonProperty
    private long id;

    @JsonProperty("title")
    @Column(name="title")
    private String title;

    @JsonProperty("author")
    @Column(name="author")
    private String author;

    @JsonProperty("description")
    @Column(name="description")
    private String description;

    @JsonProperty("copies")
    @Column(name="copies")
    private int copies;

    @JsonProperty("copies_available")
    @Column(name="copies_available")
    private int copiesAvailable;

    @JsonProperty("category")
    @Column(name="category")
    private String category;

    @JsonProperty("img")
//    @Column(name="img")
    private String img;


}
