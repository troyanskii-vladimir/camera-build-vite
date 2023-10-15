import { ChangeEvent, FormEvent, Fragment, useState } from 'react';


type CommentHandler = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

type ReviewFormProps = {
  onCloseButtonClick: () => void;
}

const MIN_COUNT_OF_TEXT_SYNBOLS = 2;
const MAX_COUNT_OF_TEXT_SYNBOLS = 160;

const ratingMap = [
  {
    score: '5',
    title: 'Отлично',
  }, {
    score: '4',
    title: 'Хорошо',
  }, {
    score: '3',
    title: 'Нормально',
  }, {
    score: '2',
    title: 'Плохо',
  }, {
    score: '1',
    title: 'Ужасно',
  }
];

function ReviewForm({onCloseButtonClick}: ReviewFormProps): JSX.Element {

  const [comment, setComment] = useState({
    rating: '0',
    userName: '',
    advantage: '',
    disadvantage: '',
    review: '',
  });

  const handleCloseButtonClick = (): void => {
    onCloseButtonClick();
  };

  const handleReviewChange = ({ target }: CommentHandler) => {
    setComment({ ...comment, [target.name]: target.value });
  };

  const handleReviewFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    // console.log(comment);
  };

  function canSubmit () {
    return comment.review.length < MIN_COUNT_OF_TEXT_SYNBOLS || comment.review.length > MAX_COUNT_OF_TEXT_SYNBOLS || comment.rating === '0';
  }

  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay" />
        <div className="modal__content">
          <p className="title title--h4">Оставить отзыв</p>
          <div className="form-review">
            <form method="post" onSubmit={handleReviewFormSubmit}>
              <div className="form-review__rate">
                <fieldset className="rate form-review__item">
                  <legend className="rate__caption">
                    Рейтинг
                    <svg width={9} height={9} aria-hidden="true">
                      <use xlinkHref="#icon-snowflake" />
                    </svg>
                  </legend>
                  <div className="rate__bar">
                    <div className="rate__group">

                      {
                        ratingMap.map(({score, title}) => (
                          <Fragment key={score}>
                            <input
                              className="visually-hidden"
                              id={`star-${score}`}
                              name="rating"
                              type="radio"
                              value={score}
                              onChange={handleReviewChange}
                              checked={comment.rating === score}
                            />
                            <label
                              className="rate__label"
                              htmlFor={`star-${score}`}
                              title={title}
                            />
                          </Fragment>
                        ))
                      }

                    </div>
                    <div className="rate__progress">
                      <span className="rate__stars">{comment.rating}</span> <span>/</span>{' '}
                      <span className="rate__all-stars">5</span>
                    </div>
                  </div>
                  <p className="rate__message">Нужно оценить товар</p>
                </fieldset>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">
                      Ваше имя
                      <svg width={9} height={9} aria-hidden="true">
                        <use xlinkHref="#icon-snowflake" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="userName"
                      placeholder="Введите ваше имя"
                      onChange={handleReviewChange}
                      value={comment.userName}
                      required
                    />
                  </label>
                  <p className="custom-input__error">Нужно указать имя</p>
                </div>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">
                      Достоинства
                      <svg width={9} height={9} aria-hidden="true">
                        <use xlinkHref="#icon-snowflake" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="advantage"
                      placeholder="Основные преимущества товара"
                      onChange={handleReviewChange}
                      value={comment.advantage}
                      required
                    />
                  </label>
                  <p className="custom-input__error">Нужно указать достоинства</p>
                </div>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">
                      Недостатки
                      <svg width={9} height={9} aria-hidden="true">
                        <use xlinkHref="#icon-snowflake" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="disadvantage"
                      placeholder="Главные недостатки товара"
                      onChange={handleReviewChange}
                      value={comment.disadvantage}
                      required
                    />
                  </label>
                  <p className="custom-input__error">Нужно указать недостатки</p>
                </div>
                <div className="custom-textarea form-review__item">
                  <label>
                    <span className="custom-textarea__label">
                      Комментарий
                      <svg width={9} height={9} aria-hidden="true">
                        <use xlinkHref="#icon-snowflake" />
                      </svg>
                    </span>
                    <textarea
                      name="review"
                      minLength={5}
                      placeholder="Поделитесь своим опытом покупки"
                      onChange={handleReviewChange}
                      value={comment.review}
                      required
                    />
                  </label>
                  <div className="custom-textarea__error">
                    Нужно добавить комментарий
                  </div>
                </div>
              </div>
              <button
                className="btn btn--purple form-review__btn"
                type="submit"
                disabled={canSubmit()}
              >
                Отправить отзыв
              </button>
            </form>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={handleCloseButtonClick}>
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewForm;
