package com.library.management.requestmodels;

import lombok.*;

import java.util.Optional;

@Data
@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class ReviewRequest {

    private double rating;

    private Long bookId;

    private Optional<String> reviewDescription;
}
