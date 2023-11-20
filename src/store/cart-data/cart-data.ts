import { createReducer } from '@reduxjs/toolkit';
import { ProductCart } from '../../types/cart';
import { addNewProduct } from './actions';


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
    });
});
