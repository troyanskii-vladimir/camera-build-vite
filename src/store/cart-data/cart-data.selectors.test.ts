import { ReducerNames } from '../../config';
import { Product } from '../../types/product';
import { makeFakeCartProduct } from '../../utils/mocks';
import { getProductsCart, getDiscount, getLastCorrectCoupon } from './selectors';


describe('Product data selectors', () => {
  const mockCartProducts = [makeFakeCartProduct(), makeFakeCartProduct()];

  const state = {
    [ReducerNames.ProductData]: {
      products: [],
      promoProducts: [],
      isProductsLoading: true,
      productData: {} as Product,
      similarProducts: [],
    },
    [ReducerNames.ReviewsData]: {
      productReviews: [],
      newCommentPending: false,
    },
    [ReducerNames.CartData]: {
      products: mockCartProducts,
      isCouponChecking: false,
      lastRightCoupon: null,
      discount: 0,
    },
  };

  it('should return products from state', () => {
    const { products } = state[ReducerNames.CartData];
    const result = getProductsCart(state);
    expect(result).toEqual(products);
  });

  it('should return discount from state', () => {
    const { discount } = state[ReducerNames.CartData];
    const result = getDiscount(state);
    expect(result).toEqual(discount);
  });

  it('should lastRightCoupon from state', () => {
    const { lastRightCoupon } = state[ReducerNames.CartData];
    const result = getLastCorrectCoupon(state);
    expect(result).toEqual(lastRightCoupon);
  });
});
