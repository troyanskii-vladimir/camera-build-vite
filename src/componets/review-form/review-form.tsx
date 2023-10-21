import { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postNewCommentAction } from '../../store/api-action';
import { MAX_COUNT_OF_TEXT_SYNBOLS, MIN_COUNT_OF_TEXT_SYNBOLS } from '../../config';


type CommentHandler = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

type ReviewFormProps = {
  productId: number;
  onCloseButtonClick: () => void;
  onSuccessSend: () => void;
}

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

function ReviewForm({productId, onCloseButtonClick, onSuccessSend}: ReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();

  const isCommentPending = useAppSelector((store) => store.newCommentPending);

  const [comment, setComment] = useState({
    rating: '0',
    userName: '',
    advantage: '',
    disadvantage: '',
    review: '',
  });

  const [errorField, setErrorField] = useState({
    rating: false,
    userName: false,
    advantage: false,
    disadvantage: false,
    review: false,
  });

  const isInputsCorrect = (): boolean => !(errorField.rating || errorField.userName || errorField.advantage || errorField.disadvantage || errorField.review);

  const checkInput = (): void => {
    setErrorField({
      ...errorField,
      'rating': comment.rating === '0',
      'userName': !(comment.userName.length >= MIN_COUNT_OF_TEXT_SYNBOLS && comment.userName.length <= MAX_COUNT_OF_TEXT_SYNBOLS),
      'advantage': !(comment.advantage.length >= MIN_COUNT_OF_TEXT_SYNBOLS && comment.advantage.length <= MAX_COUNT_OF_TEXT_SYNBOLS),
      'disadvantage': !(comment.disadvantage.length >= MIN_COUNT_OF_TEXT_SYNBOLS && comment.disadvantage.length <= MAX_COUNT_OF_TEXT_SYNBOLS),
      'review': !(comment.review.length >= MIN_COUNT_OF_TEXT_SYNBOLS && comment.review.length <= MAX_COUNT_OF_TEXT_SYNBOLS),
    });
  };

  const handleCloseButtonClick = (): void => {
    onCloseButtonClick();
  };

  const handleReviewChange = ({ target }: CommentHandler) => {
    if (target.name !== 'rating') {
      setErrorField({ ...errorField, [target.name]: !(target.value.length >= MIN_COUNT_OF_TEXT_SYNBOLS && target.value.length <= MAX_COUNT_OF_TEXT_SYNBOLS)});
    } else {
      setErrorField({ ...errorField, [target.name]: false});
    }
    setComment({ ...comment, [target.name]: target.value });
  };

  const handleReviewFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    checkInput();

    if (isInputsCorrect() && comment.review) {
      dispatch(postNewCommentAction({
        cameraId: productId,
        userName: comment.userName,
        advantage: comment.advantage,
        disadvantage: comment.disadvantage,
        review: comment.review,
        rating: Number(comment.rating),
        onSuccess: () => {
          setComment({
            rating: '0',
            userName: '',
            advantage: '',
            disadvantage: '',
            review: '',
          });
        }
      }));
      onSuccessSend();
    }
  };


  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay" />
        <div className="modal__content">
          <p className="title title--h4">Оставить отзыв</p>
          <div className="form-review">
            <form method="post" onSubmit={handleReviewFormSubmit}>
              <div className="form-review__rate">
                <fieldset className={`rate form-review__item ${errorField.rating ? 'is-invalid' : ''}`}>
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
                <div className={`custom-input form-review__item ${errorField.userName ? 'is-invalid' : ''}`}>
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
                    />
                  </label>
                  <p className="custom-input__error">Нужно указать имя</p>
                </div>
                <div className={`custom-input form-review__item ${errorField.advantage ? 'is-invalid' : ''}`}>
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
                    />
                  </label>
                  <p className="custom-input__error">Нужно указать достоинства</p>
                </div>
                <div className={`custom-input form-review__item ${errorField.disadvantage ? 'is-invalid' : ''}`}>
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
                    />
                  </label>
                  <p className="custom-input__error">Нужно указать недостатки</p>
                </div>
                <div className={`custom-textarea form-review__item ${errorField.review ? 'is-invalid' : ''}`}>
                  <label>
                    <span className="custom-textarea__label">
                      Комментарий
                      <svg width={9} height={9} aria-hidden="true">
                        <use xlinkHref="#icon-snowflake" />
                      </svg>
                    </span>
                    <textarea
                      name="review"
                      placeholder="Поделитесь своим опытом покупки"
                      onChange={handleReviewChange}
                      value={comment.review}
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
                disabled={isCommentPending}
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
