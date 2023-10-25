import { SyntheticEvent, useEffect, useState } from 'react';
import { Review } from '../../types/review';
import ReviewsItem from '../review-item/review-item';
import { COUNT_OF_REVIEWS_PART } from '../../config';


type ReviewsListProps = {
  reviews: Review[];
  onCreateReviewButtonClick: () => void;
}


function ReviewsList({reviews, onCreateReviewButtonClick}: ReviewsListProps): JSX.Element {
  const [activeReviews, setActiveReviewsIndex] = useState<Review[]>([]);

  useEffect(() => {
    setActiveReviewsIndex([reviews[0], reviews[1], reviews[2]]);

    if (reviews.length <= COUNT_OF_REVIEWS_PART) {
      setActiveReviewsIndex(reviews);
    }
  }, [reviews]);


  const handleCreateReviewButtonClick = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onCreateReviewButtonClick();
  };

  const handleMoreClick = (): void => {
    const countOfReviews = activeReviews.length;

    if (reviews.length - countOfReviews < 2) {
      setActiveReviewsIndex([...activeReviews, reviews[countOfReviews]]);
    } else if (reviews.length - countOfReviews < 3) {
      setActiveReviewsIndex([...activeReviews, reviews[countOfReviews], reviews[countOfReviews + 1]]);
    } else {
      setActiveReviewsIndex([...activeReviews, reviews[countOfReviews], reviews[countOfReviews + 1], reviews[countOfReviews + 2]]);
    }
  };

  return (
    <div className="page-content__section">
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button className="btn" type="button" onClick={handleCreateReviewButtonClick}>
              Оставить свой отзыв
            </button>
          </div>
          <ul className="review-block__list">
            {
              activeReviews.map((review) => (
                <li className="review-card" key={review.id}>
                  <ReviewsItem review={review} />
                </li>
              ))
            }
          </ul>
          <div className="review-block__buttons">
            {
              activeReviews.length !== reviews.length &&
              <button className="btn btn--purple" type="button" onClick={handleMoreClick}>
                Показать больше отзывов
              </button>
            }
          </div>
        </div>
      </section>
    </div>
  );
}

export default ReviewsList;
