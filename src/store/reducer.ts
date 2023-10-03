import { createReducer } from '@reduxjs/toolkit';
import { Product } from '../types/product';
import { loadProducts, setProductsLoading } from './action';


type InitialState = {
  products: Product[];
  isProductsLoading: boolean;
}

const initialState: InitialState = {
  products: [],
  isProductsLoading: false,
};


export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadProducts, (state, action) => {
      state. products = action.payload;
    })
    .addCase(setProductsLoading, (state, action) => {
      state.isProductsLoading = action.payload;
    });
});
