import { createAction } from '@reduxjs/toolkit';
import { Product } from '../types/product';
import { PromoProduct } from '../types/promo-product';
import { Review } from '../types/review';

export const setProductsLoading = createAction<boolean>('setProductsLoading');
export const loadProducts = createAction<Product[]>('loadProducts');
export const loadPromoProducts = createAction<PromoProduct[]>('loadPromoProducts');
export const loadProductData = createAction<Product>('loadProductData');
export const loadSimilarProducts = createAction<Product[]>('loadSimilarProducts');
export const loadProductReview = createAction<Review[]>('loadProductReviews');
