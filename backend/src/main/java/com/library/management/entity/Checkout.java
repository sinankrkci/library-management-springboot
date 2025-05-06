package com.library.management.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import javax.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Data
@Table(name="checkout")
@Getter
@Setter
public class Checkout {

    public Checkout() {}

    public Checkout(String userEmail, String checkoutDate, String returnDate, Long bookId) {
        this.userEmail = userEmail;
        this.checkoutDate = checkoutDate;
        this.returnDate = returnDate;
        this.bookId = bookId;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    @JsonProperty
    private Long id;

    @Column(name="user_email")
    @JsonProperty
    String userEmail;

    @JsonProperty
    @Column(name="checkout_date")
    String checkoutDate;

    @JsonProperty
    @Column(name="return_date")
    String returnDate;

    @JsonProperty
    @Column(name="book_id")
    Long bookId;
}
