import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { loadProducts, loadPromoProducts, setProductsLoading, loadProductData, loadSimilarProducts, loadProductReview } from './action';
import { Product } from '../types/product';
import { APIRoute } from '../config';
import { Review } from '../types/review';


export const fetchProductsAction = createAsyncThunk<void, undefined, {
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


export const fetchPromoProductsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchProducts',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setProductsLoading(true));
    const {data} = await api.get<Product[]>(APIRoute.Promo);
    dispatch(loadPromoProducts(data));
    dispatch(setProductsLoading(false));
  }
);


export const fetchProductDataAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchProductData',
  async (productId, {dispatch, extra: api}) => {
    dispatch(setProductsLoading(true));
    const {data} = await api.get<Product>(`${APIRoute.Cameras}/${productId}`);
    dispatch(loadProductData(data));
    dispatch(setProductsLoading(false));
  }
);


export const fetchSimilarProductsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchSimilarProducts',
  async (productId, {dispatch, extra: api}) => {
    dispatch(setProductsLoading(true));
    const {data} = await api.get<Product[]>(`${APIRoute.Cameras}/${productId}${APIRoute.Similar}`);
    dispatch(loadSimilarProducts(data));
    dispatch(setProductsLoading(false));
  }
);


export const fetchProductReviewsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchProductReviews',
  async (productId, {dispatch, extra: api}) => {
    dispatch(setProductsLoading(true));
    const {data} = await api.get<Review[]>(`${APIRoute.Cameras}/${productId}${APIRoute.Reviews}`);
    dispatch(loadProductReview(data));
    dispatch(setProductsLoading(false));
  }
);
