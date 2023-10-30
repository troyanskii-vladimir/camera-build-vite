import { createReducer } from '@reduxjs/toolkit';
import { Review } from '../../types/review';
import { createNewComment, loadProductReview, setNewCommentPending } from './actions';
import dayjs from 'dayjs';


type InitialState = {
  productReviews: Review[];
  newCommentPending: boolean;
}

const initialState: InitialState = {
  productReviews: [],
  newCommentPending: false,
};

function sortPointsByDate (a: Review, b: Review): number {
  return dayjs(a.createAt) < dayjs(b.createAt) ? 1 : -1;
}

export const ReviewsData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadProductReview, (state, action) => {
      state.productReviews = action.payload.sort(sortPointsByDate);
    })
    .addCase(setNewCommentPending, (state, action) => {
      state.newCommentPending = action.payload;
    })
    .addCase(createNewComment, (state, action) => {
      state.productReviews.unshift(action.payload);
    });
});
