import { createAction } from '@reduxjs/toolkit';
import { ProductCart } from '../../types/cart';


export const addNewProduct = createAction<ProductCart[]>('addNewProduct');
