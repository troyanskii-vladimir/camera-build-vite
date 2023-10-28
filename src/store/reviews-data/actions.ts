import { createAction } from '@reduxjs/toolkit';
import { Review } from '../../types/review';

export const loadProductReview = createAction<Review[]>('loadProductReviews');
export const createNewComment = createAction<Review>('postNewComment');
export const setNewCommentPending = createAction<boolean>('setNewCommentPending');
