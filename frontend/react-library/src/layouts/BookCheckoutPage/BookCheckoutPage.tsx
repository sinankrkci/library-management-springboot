import { use, useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import { StarsReview } from "../Utils/StarsReview";
import { CheckoutAndReviewBox } from "./CheckoutAndReviewBox";
import ReviewModel from "../../models/ReviewModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { LatestReviews } from "./LatestReviews";

export const BookCheckoutPage = () => {

    const [book, setBook] = useState<BookModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    
    // Review State
    const [review, setReview] = useState<ReviewModel[]>([]);
    const [totalStars, setTotalStars] = useState(0);
    const [isLoadingReview, setIsLoadingReview] = useState(true);


    const bookId= (window.location.pathname).split("/")[2];

    useEffect(() => {
        const fetchBook = async () => {
          const baseUrl: string = `http://localhost:8080/api/books/${bookId}`; 
    
          const url: string = `${baseUrl}?page=0&size=9`;
    
          const response = await fetch(baseUrl);
    
          if (!response.ok) {
            throw new Error("Something went wrong!");
          }
    
          const responseJson = await response.json();
          
          const loadedBook: BookModel = {
            id: responseJson.id,
            title: responseJson.title,
            author: responseJson.author,
            description: responseJson.description,
            copies: responseJson.copies,
            copiesAvailable: responseJson.copiesAvailable,
            category: responseJson.category,
            img: responseJson.img,
          }
    

      
            setBook(loadedBook);
            setIsLoading(false);
          };
        
        fetchBook().catch((error: any) => {
          setIsLoading(false);
          setHttpError(error.message);
        });
      }, []);

      useEffect(() => {
        const fetchBookReview = async () => {
            const reviewUrl: string = `http://localhost:8080/api/reviews/search/findByBookId?bookId=${bookId}`;

            const responseReviews = await fetch(reviewUrl);

            if(!responseReviews.ok) {
                throw new Error("Something went wrong!");
            } 

            const responseJsonReviews = await responseReviews.json();

            const responseData = responseJsonReviews._embedded.reviews;

            const loadedReviews: ReviewModel[] = [];

            let weightedStarReviews: number = 0;

            for (const key in responseData) {
                const review: ReviewModel = {
                    id: responseData[key].id,
                    userEmail: responseData[key].userEmail,
                    date: responseData[key].date,
                    rating: responseData[key].rating,
                    book_id: responseData[key].bookId,
                    reviewDescription: responseData[key].reviewDescription
                };
                loadedReviews.push(review);
                weightedStarReviews = weightedStarReviews + responseData[key].rating;
            }
            
            if (loadedReviews){
                const round = (Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2).toFixed(1);
                setTotalStars(Number(round));
            }

            setReview(loadedReviews);
            setIsLoadingReview(false);

        };

        fetchBookReview().catch((error: any) => {
            setIsLoadingReview(false);
            setHttpError(error.message);
        });
      }, []);

      if(isLoading || isLoadingReview) {
        return (
            <SpinnerLoading/>
        );
        }

        if(httpError) {
            return (
                <div className="container mt-5">
                    <p>{httpError}</p>
                </div>
            );
        }
        


    return(
        <div>
            <div className="container d-none d-lg-block">
                <div className="row mt-5 ">
                    <div className="col-sm-2 col-md-2">
                        {book?.img ? 
                        <img src={book?.img} width="226" height="349" alt="Book" /> 
                        :
                        <img src={require(`./../../Images/BooksImages/book-luv2code-1000.png`)}
                            height="349" alt="Book" />   
                    }
                    </div>
                    <div className="col-4 col-md-4 container">
                        <div className="ml-2">
                            <h2>{book?.title}</h2>
                            <h5 className="text-primary">{book?.author}</h5>
                            <p className="lead">{book?.description}</p>
                            <StarsReview rating={totalStars} size={32}/>
                        </div>
                    </div>
                    <CheckoutAndReviewBox book ={book} mobile={false}/>

                </div>
                <hr />

                <LatestReviews reviews={review} bookId={book?.id} mobile={false}/>

            </div>
            <div className="container d-lg-none mt-5">
                <div className="d-flex justify-content-center align-items-center">
                    {book?.img ? 
                        <img src={book?.img} width="226" height="349" alt="Book" /> 
                        :
                        <img src={require(`./../../Images/BooksImages/book-luv2code-1000.png`)}
                            height="349" alt="Book" /> 
                    }
                </div>
                <div className="mt-4">
                    <div className="ml-2">
                        <h2>{book?.title}</h2>
                        <h5 className="text-priamry">{book?.author}</h5>
                        <p className="lead">{book?.description}</p>
                        <StarsReview rating={totalStars} size={32}/>
                    </div>
                </div>
                <CheckoutAndReviewBox book ={book} mobile={true}/>
                <hr />
                <LatestReviews reviews={review} bookId={book?.id} mobile={true}/>
            </div>
        </div>
    );
}