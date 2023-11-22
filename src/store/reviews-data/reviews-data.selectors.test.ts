import { ReducerNames } from '../../config';
import { Product } from '../../types/product';
import { makeFakeReview } from '../../utils/mocks';
import { getNewCommentPendingStatus, getReviews } from './selectors';


describe('Product data selectors', () => {
  const mockReviews = [makeFakeReview(), makeFakeReview()];

  const state = {
    [ReducerNames.ProductData]: {
      products: [],
      promoProducts: [],
      isProductsLoading: true,
      productData: {} as Product,
      similarProducts: [],
    },
    [ReducerNames.ReviewsData]: {
      productReviews: mockReviews,
      newCommentPending: false,
    },
    [ReducerNames.CartData]: {
      products: [],
      isCouponChecking: false,
      lastRightCoupon: null,
      discount: 0,
    },
  };

  it('should return product reviews from state', () => {
    const { productReviews } = state[ReducerNames.ReviewsData];
    const result = getReviews(state);
    expect(result).toEqual(productReviews);
  });

  it('should return status pending new review from state', () => {
    const { newCommentPending } = state[ReducerNames.ReviewsData];
    const result = getNewCommentPendingStatus(state);
    expect(result).toEqual(newCommentPending);
  });
});
