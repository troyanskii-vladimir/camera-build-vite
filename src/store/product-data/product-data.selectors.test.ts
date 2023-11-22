import { ReducerNames } from '../../config';
import { makeFakeProduct, makeFakePromoProduct } from '../../utils/mocks';
import { getProductData, getProducts, getProductsLoadingStatus, getPromoProducts, getSimilarProducts } from './selectors';


describe('Product data selectors', () => {
  const mockProducts = [makeFakeProduct(), makeFakeProduct()];
  const mockPromoProducts = [makeFakePromoProduct(), makeFakePromoProduct()];
  const mockSimilarProducts = [makeFakeProduct(), makeFakeProduct()];
  const mockProduct = makeFakeProduct();

  const state = {
    [ReducerNames.ProductData]: {
      products: mockProducts,
      promoProducts: mockPromoProducts,
      isProductsLoading: true,
      productData: mockProduct,
      similarProducts: mockSimilarProducts,
    },
    [ReducerNames.ReviewsData]: {
      productReviews: [],
      newCommentPending: false,
    },
    [ReducerNames.CartData]: {
      products: [],
      isCouponChecking: false,
      lastRightCoupon: null,
      discount: 0,
    },
  };

  it('should return products from state', () => {
    const { products } = state[ReducerNames.ProductData];
    const result = getProducts(state);
    expect(result).toEqual(products);
  });

  it('should return product data from state', () => {
    const { productData } = state[ReducerNames.ProductData];
    const result = getProductData(state);
    expect(result).toEqual(productData);
  });

  it('should return similar products from state', () => {
    const { similarProducts } = state[ReducerNames.ProductData];
    const result = getSimilarProducts(state);
    expect(result).toEqual(similarProducts);
  });

  it('should return promo products from state', () => {
    const { promoProducts } = state[ReducerNames.ProductData];
    const result = getPromoProducts(state);
    expect(result).toEqual(promoProducts);
  });

  it('should return staus loading products from state', () => {
    const { isProductsLoading } = state[ReducerNames.ProductData];
    const result = getProductsLoadingStatus(state);
    expect(result).toEqual(isProductsLoading);
  });
});
