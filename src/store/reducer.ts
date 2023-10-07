import { createReducer } from '@reduxjs/toolkit';
import { Product } from '../types/product';
import { loadProducts, setProductsLoading, loadPromoProducts } from './action';
import { PromoProduct } from '../types/promo-product';


type InitialState = {
  products: Product[];
  promoProducts: PromoProduct[];
  isProductsLoading: boolean;
}

const initialState: InitialState = {
  products: [],
  promoProducts: [],
  isProductsLoading: false,
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
    });
});
