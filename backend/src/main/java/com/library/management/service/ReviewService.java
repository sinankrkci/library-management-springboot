package com.library.management.service;

import com.library.management.dao.BookRepository;
import com.library.management.dao.ReviewRepository;
import com.library.management.entity.Review;
import com.library.management.requestmodels.ReviewRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class ReviewService {


    private ReviewRepository reviewRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public void postReview(String userEmail, ReviewRequest reviewRequest) throws Exception {
        Review validateReview = reviewRepository.findByUserEmailAndBookId(userEmail,reviewRequest.getBookId());
        if (validateReview != null) {
            throw new Exception("Review already exists");
        }

        Review review = new Review();
        review.setBookId(reviewRequest.getBookId());
        review.setUserEmail(userEmail);
        review.setRating(reviewRequest.getRating());

        if (reviewRequest.getReviewDescription().isPresent()) {
            review.setReviewDescription(reviewRequest.getReviewDescription().map(
                    Object::toString
            ).orElse(null));
        }

        review.setDate(Date.valueOf(LocalDate.now()));
        reviewRepository.save(review);
    }

    public Boolean userReviewListed(String userEmail, Long bookId) {
        Review validateReview = reviewRepository.findByUserEmailAndBookId(userEmail,bookId);
        if (validateReview != null) {
            return true;
        } else {
            return false;
        }
    }

    public List<Review> findByBookId(Long bookId) {
        return reviewRepository.findBybookId(bookId);
    }
}
