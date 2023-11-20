import { createAction } from '@reduxjs/toolkit';
import { ProductCart } from '../../types/cart';


export const addNewProduct = createAction<ProductCart>('addNewProduct');
export const changeProduct = createAction<ProductCart>('changeProduct');
export const deleteProduct = createAction<ProductCart>('deleteProduct');