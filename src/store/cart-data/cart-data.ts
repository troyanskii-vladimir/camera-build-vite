import { createReducer } from '@reduxjs/toolkit';
import { ProductCart } from '../../types/cart';
import { addNewProduct, changeDiscount, changeProduct, cleanCart, deleteProduct, setCouponPending, setLastCorrectCoupon } from './actions';


type InitialState = {
  products: ProductCart[];
  isCouponChecking: boolean;
  lastRightCoupon: string | null;
  discount: number;
}

const initialState: InitialState = {
  products: [],
  isCouponChecking: false,
  lastRightCoupon: null,
  discount: 0,
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
    })
    .addCase(setLastCorrectCoupon, (state, action) => {
      state.lastRightCoupon = action.payload;
    })
    .addCase(setCouponPending, (state, action) => {
      state.isCouponChecking = action.payload;
    })
    .addCase(changeDiscount, (state, action) => {
      state.discount = action.payload;
    })
    .addCase(cleanCart, (state) => {
      state.products = [];
      state.discount = 0;
    });
});
