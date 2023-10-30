import { Review } from '../../types/review';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
dayjs.locale('ru');


type ReviewItemProps = {
  review: Review;
}

function ReviewItem({review} : ReviewItemProps): JSX.Element {
  const ratingArray = Array.from({ length: 5 }, (_e, i) => (i < review.rating) ? {class: 'full-', i} : {class: '', i});

  return (
    <>
      <div className="review-card__head">
        <p className="title title--h4">{review.userName}</p>
        <time className="review-card__data" dateTime={dayjs(review.createAt).format('YYYY-MM-DD')}>
          {dayjs(review.createAt).format('DD MMMM')}
        </time>
      </div>
      <div className="rate review-card__rate">
        {
          ratingArray.map((star) => (
            <svg width={17} height={16} aria-hidden="true" key={star.i}>
              <use xlinkHref={`#icon-${star.class}star`} />
            </svg>
          ))
        }
        <p className="visually-hidden">Оценка: {review.rating}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list">
          <span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">
            {review.advantage}
          </p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">
            {review.disadvantage}
          </p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">
            {review.review}
          </p>
        </li>
      </ul>
    </>
  );
}

export default ReviewItem;
