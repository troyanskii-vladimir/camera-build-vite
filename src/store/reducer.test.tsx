import { Product } from '../types/product';
import { makeFakeProduct, makeFakePromoProduct, makeFakeReview } from '../utils/mocks';
import { createNewComment, loadProductData, loadProductReview, loadProducts, loadPromoProducts, loadSimilarProducts, setNewCommentPending, setProductsLoading } from './action';
import { reducer } from './reducer';


describe('Reducer', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      products: [],
      promoProducts: [],
      isProductsLoading: true,
      productData: {} as Product,
      similarProducts: [],
      productReviews: [],
      newCommentPending: true,
    };

    const result = reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });


  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      products: [],
      promoProducts: [],
      isProductsLoading: true,
      productData: {} as Product,
      similarProducts: [],
      productReviews: [],
      newCommentPending: false,
    };

    const result = reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });


  it('should change status loading with "setProductsLoading" action', () => {
    const initialState = {
      products: [],
      promoProducts: [],
      isProductsLoading: false,
      productData: {} as Product,
      similarProducts: [],
      productReviews: [],
      newCommentPending: true,
    };
    const expectedState = {
      products: [],
      promoProducts: [],
      isProductsLoading: true,
      productData: {} as Product,
      similarProducts: [],
      productReviews: [],
      newCommentPending: true,
    };

    const result = reducer(initialState, setProductsLoading(true));

    expect(result).toEqual(expectedState);
  });


  it('should change status pending with "setNewCommentPending" action', () => {
    const initialState = {
      products: [],
      promoProducts: [],
      isProductsLoading: false,
      productData: {} as Product,
      similarProducts: [],
      productReviews: [],
      newCommentPending: false,
    };
    const expectedState = {
      products: [],
      promoProducts: [],
      isProductsLoading: false,
      productData: {} as Product,
      similarProducts: [],
      productReviews: [],
      newCommentPending: true,
    };

    const result = reducer(initialState, setNewCommentPending(true));

    expect(result).toEqual(expectedState);
  });


  it('should add products with "loadProducts" action', () => {
    const initialState = {
      products: [],
      promoProducts: [],
      isProductsLoading: false,
      productData: {} as Product,
      similarProducts: [],
      productReviews: [],
      newCommentPending: false,
    };
    const product = makeFakeProduct();
    const expectedState = {
      products: [product],
      promoProducts: [],
      isProductsLoading: false,
      productData: {} as Product,
      similarProducts: [],
      productReviews: [],
      newCommentPending: false,
    };

    const result = reducer(initialState, loadProducts([product]));

    expect(result).toEqual(expectedState);
  });


  it('should add promo products with "loadPromoProducts" action', () => {
    const initialState = {
      products: [],
      promoProducts: [],
      isProductsLoading: false,
      productData: {} as Product,
      similarProducts: [],
      productReviews: [],
      newCommentPending: false,
    };
    const promoProduct = makeFakePromoProduct();
    const expectedState = {
      products: [],
      promoProducts: [promoProduct],
      isProductsLoading: false,
      productData: {} as Product,
      similarProducts: [],
      productReviews: [],
      newCommentPending: false,
    };

    const result = reducer(initialState, loadPromoProducts([promoProduct]));

    expect(result).toEqual(expectedState);
  });


  it('should add product with "loadProductData" action', () => {
    const initialState = {
      products: [],
      promoProducts: [],
      isProductsLoading: false,
      productData: {} as Product,
      similarProducts: [],
      productReviews: [],
      newCommentPending: false,
    };
    const product = makeFakeProduct();
    const expectedState = {
      products: [],
      promoProducts: [],
      isProductsLoading: false,
      productData: product,
      similarProducts: [],
      productReviews: [],
      newCommentPending: false,
    };

    const result = reducer(initialState, loadProductData(product));

    expect(result).toEqual(expectedState);
  });


  it('should add similar products with "loadSimilarProducts" action', () => {
    const initialState = {
      products: [],
      promoProducts: [],
      isProductsLoading: false,
      productData: {} as Product,
      similarProducts: [],
      productReviews: [],
      newCommentPending: false,
    };
    const product = makeFakeProduct();
    const expectedState = {
      products: [],
      promoProducts: [],
      isProductsLoading: false,
      productData: {} as Product,
      similarProducts: [product],
      productReviews: [],
      newCommentPending: false,
    };

    const result = reducer(initialState, loadSimilarProducts([product]));

    expect(result).toEqual(expectedState);
  });


  it('should add reviews with "loadProductReview" action', () => {
    const initialState = {
      products: [],
      promoProducts: [],
      isProductsLoading: false,
      productData: {} as Product,
      similarProducts: [],
      productReviews: [],
      newCommentPending: false,
    };
    const review = makeFakeReview();
    const expectedState = {
      products: [],
      promoProducts: [],
      isProductsLoading: false,
      productData: {} as Product,
      similarProducts: [],
      productReviews: [review],
      newCommentPending: false,
    };

    const result = reducer(initialState, loadProductReview([review]));

    expect(result).toEqual(expectedState);
  });


  it('should add new comment with "createNewComment" action', () => {
    const initialState = {
      products: [],
      promoProducts: [],
      isProductsLoading: false,
      productData: {} as Product,
      similarProducts: [],
      productReviews: [],
      newCommentPending: false,
    };
    const review = makeFakeReview();
    const expectedState = {
      products: [],
      promoProducts: [],
      isProductsLoading: false,
      productData: {} as Product,
      similarProducts: [],
      productReviews: [review],
      newCommentPending: false,
    };

    const result = reducer(initialState, createNewComment(review));

    expect(result).toEqual(expectedState);
  });
});
