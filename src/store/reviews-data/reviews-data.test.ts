import { makeFakeReview } from '../../utils/mocks';
import { createNewComment, loadProductReview, setNewCommentPending } from './actions';
import { ReviewsData } from './reviews-data';


describe('Product data reducer', () => {
  it('should change status pending with "setNewCommentPending" action', () => {
    const initialState = {
      productReviews: [],
      newCommentPending: false,
    };
    const expectedState = {
      productReviews: [],
      newCommentPending: true,
    };

    const result = ReviewsData(initialState, setNewCommentPending(true));

    expect(result).toEqual(expectedState);
  });


  it('should add reviews with "loadProductReview" action', () => {
    const initialState = {
      productReviews: [],
      newCommentPending: false,
    };
    const review = makeFakeReview();
    const expectedState = {
      productReviews: [review],
      newCommentPending: false,
    };

    const result = ReviewsData(initialState, loadProductReview([review]));

    expect(result).toEqual(expectedState);
  });


  it('should add new comment with "createNewComment" action', () => {
    const initialState = {
      productReviews: [],
      newCommentPending: false,
    };
    const review = makeFakeReview();
    const expectedState = {
      productReviews: [review],
      newCommentPending: false,
    };

    const result = ReviewsData(initialState, createNewComment(review));

    expect(result).toEqual(expectedState);
  });
});
