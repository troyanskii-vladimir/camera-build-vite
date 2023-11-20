import { createReducer } from '@reduxjs/toolkit';
import { ProductCart } from '../../types/cart';
import { addNewProduct, changeProduct, deleteProduct } from './actions';


type InitialState = {
  products: ProductCart[];
}

const initialState: InitialState = {
  products: [],
};

export const CartData = createReducer(initialState, (builder) => {
  builder
    .addCase(addNewProduct, (state, action) => {
      state.products.push(action.payload);
    })
    .addCase(changeProduct, (state, action) => {
      const index = state.products.findIndex((product) => product.id === action.payload.id);
      state.products = state.products.filter((product) => product.id !== action.payload.id);
      state.products.splice(index, 0, action.payload);
    })
    .addCase(deleteProduct, (state, action) => {
      state.products = state.products.filter((product) => product.id !== action.payload.id);
    });
});
