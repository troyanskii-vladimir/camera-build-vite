import { createAction } from '@reduxjs/toolkit';
import { ProductCart } from '../../types/cart';


export const addProductsToCart = createAction<ProductCart[]>('addProductsToCart');
export const addNewProduct = createAction<ProductCart>('addNewProduct');
export const changeProduct = createAction<ProductCart>('changeProduct');
export const deleteProduct = createAction<ProductCart>('deleteProduct');
export const setLastCorrectCoupon = createAction<string | null>('setLastCorrectCoupon');
export const setCouponPending = createAction<boolean>('setCouponPending');
export const changeDiscount = createAction<number>('changeDiscount');
export const cleanCart = createAction('cleanCart');
