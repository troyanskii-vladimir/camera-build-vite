import { ReducerNames } from '../../config';
import { Review } from '../../types/review';
import { State } from '../../types/state';

export const getReviews = (state: State): Review[] => state[ReducerNames.ReviewsData].productReviews;
export const getNewCommentPendingStatus = (state: State): boolean => state[ReducerNames.ReviewsData].newCommentPending;
