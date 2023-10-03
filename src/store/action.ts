import { createAction } from '@reduxjs/toolkit';
import { Product } from '../types/product';

export const setProductsLoading = createAction<boolean>('setProductsLoading');
export const loadProducts = createAction<Product[]>('loadProducts');
