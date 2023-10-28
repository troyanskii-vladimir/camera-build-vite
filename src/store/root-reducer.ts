import { combineReducers } from '@reduxjs/toolkit';
import { ReducerNames } from '../config';
import { ProductData } from './product-data/product-data';
import { ReviewsData } from './reviews-data/reviews-data';


export const rootReducer = combineReducers({
  [ReducerNames.ProductData]: ProductData,
  [ReducerNames.ReviewsData]: ReviewsData,
});
