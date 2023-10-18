import { createReducer } from '@reduxjs/toolkit';
import { Product } from '../types/product';
import { loadProducts, setProductsLoading, loadPromoProducts, loadProductData, loadSimilarProducts, loadProductReview, setNewCommentPending, createNewComment } from './action';
import { PromoProduct } from '../types/promo-product';
import { Review } from '../types/review';


type InitialState = {
  products: Product[];
  promoProducts: PromoProduct[];
  isProductsLoading: boolean;
  productData: Product;
  similarProducts: Product[];
  productReviews: Review[];
  newCommentPending: boolean;
}

const initialState: InitialState = {
  products: [],
  promoProducts: [],
  isProductsLoading: true,
  productData: {} as Product,
  similarProducts: [],
  productReviews: [],
  newCommentPending: false,
};


export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadProducts, (state, action) => {
      state.products = action.payload;
    })
    .addCase(loadPromoProducts, (state, action) => {
      state.promoProducts = action.payload;
    })
    .addCase(setProductsLoading, (state, action) => {
      state.isProductsLoading = action.payload;
    })
    .addCase(loadProductData, (state, action) => {
      state.productData = action.payload;
    })
    .addCase(loadSimilarProducts, (state, action) => {
      state.similarProducts = action.payload;
    })
    .addCase(loadProductReview, (state, action) => {
      state.productReviews = action.payload;
    })
    .addCase(setNewCommentPending, (state, action) => {
      state.newCommentPending = action.payload;
    })
    .addCase(createNewComment, (state, action) => {
      state.productReviews.push(action.payload);
    });
});
