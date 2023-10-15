import { createReducer } from '@reduxjs/toolkit';
import { Product } from '../types/product';
import { loadProducts, setProductsLoading, loadPromoProducts, loadProductData, laodSimilarProducts } from './action';
import { PromoProduct } from '../types/promo-product';


type InitialState = {
  products: Product[];
  promoProducts: PromoProduct[];
  isProductsLoading: boolean;
  productData: Product;
  similarProducts: Product[];
}

const initialState: InitialState = {
  products: [],
  promoProducts: [],
  isProductsLoading: true,
  productData: {} as Product,
  similarProducts: [],
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
    .addCase(laodSimilarProducts, (state, action) => {
      state.similarProducts = action.payload;
    });
});
