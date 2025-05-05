package com.library.management.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Entity
@Table(name="review")
@Data
@Getter
@Setter
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    @JsonProperty
    private Long id;

    @JsonProperty
    @Column(name="user_email")
    private String userEmail;

    @JsonProperty
    @Column(name="date")
    @CreationTimestamp
    private Date date;

    @JsonProperty
    @Column(name="rating")
    private double rating;

    @JsonProperty
    @Column(name="book_id")
    private Long bookId;

    @JsonProperty
    @Column(name="review_description")
    private String reviewDescription;
}
