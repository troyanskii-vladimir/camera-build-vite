import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { loadProducts, setProductsLoading } from './action';
import { Product } from '../types/product';
import { APIRoute } from '../config';

export const fetchProducts = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchProducts',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setProductsLoading(true));
    const {data} = await api.get<Product[]>(APIRoute.Cameras);
    dispatch(loadProducts(data));
    dispatch(setProductsLoading(false));
  }
);
