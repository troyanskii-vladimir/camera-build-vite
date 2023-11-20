import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { Product } from '../types/product';
import { APIRoute } from '../config';
import { Comment, Review } from '../types/review';
import { loadProductData, loadProducts, loadPromoProducts, loadSimilarProducts, setProductsLoading } from './product-data/actions';
import { createNewComment, loadProductReview, setNewCommentPending } from './reviews-data/actions';
import { Coupon } from '../types/coupon';
import { changeDiscount, setCouponPending, setLastCorrectCoupon } from './cart-data/actions';
import { Order } from '../types/order';


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


export const postNewCommentAction = createAsyncThunk<void, Comment & {onSuccess: () => void}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'postNewComment',
  async (param, {dispatch, extra: api}) => {
    const {cameraId, userName, advantage, disadvantage, review, rating, onSuccess} = param;
    dispatch(setNewCommentPending(true));
    const response = await api.post<Review>(APIRoute.Reviews, { cameraId, userName, advantage, disadvantage, review, rating });
    if (response.status === 201) {
      onSuccess();
    }
    const {data} = response;
    dispatch(setNewCommentPending(false));
    dispatch(createNewComment(data));
  }
  );


export const checkCouponValueAction = createAsyncThunk<void, Coupon & {onSuccess: () => void} & {onFail: () => void}, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'checkCouponValue',
  async (param, {dispatch, extra: api}) => {
    const {coupon, onSuccess, onFail} = param;
    dispatch(setCouponPending(true));

    dispatch(changeDiscount(0));
    onFail();
    dispatch(setLastCorrectCoupon(null));

    const response = await api.post<number>(APIRoute.Coupons, { coupon });
    const {data} = response;
    if (response.status === 200) {
      onSuccess();
      dispatch(changeDiscount(data));
      dispatch(setLastCorrectCoupon(coupon));
    }
    dispatch(setCouponPending(false));
  }
  );


export const postNewOrderAction = createAsyncThunk<void, Order & {onSuccess: () => void}, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'postNewOrder',
  async (param, {extra: api}) => {
    const {camerasIds, coupon, onSuccess} = param;
    const response = await api.post<number>(APIRoute.Orders, { camerasIds, coupon });
    if (response.status === 201) {
      onSuccess();
    }
  }
  );
