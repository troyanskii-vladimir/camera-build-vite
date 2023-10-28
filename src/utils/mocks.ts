import { lorem, datatype, commerce, vehicle, image, internet } from 'faker';
import { Type, Product, Category, Level } from '../types/product';
import { Comment, Review } from '../types/review';
import { PromoProduct } from '../types/promo-product';
import { ThunkDispatch } from 'redux-thunk';
import { State } from '../types/state';
import { createAPI } from '../services/api';
import { Action } from 'redux';
import { ReducerNames } from '../config';


export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const makeFakeProduct = (): Product => ({
  id: datatype.number(),
  name: commerce.productName(),
  vendorCode: datatype.uuid(),
  type: vehicle.type() as Type,
  category: vehicle.type() as Category,
  description: commerce.productDescription(),
  level: vehicle.type() as Level,
  price: Number(commerce.price(10000, 200000)),
  rating: datatype.number(5),
  reviewCount: datatype.number(500),
  previewImg: image.imageUrl(),
  previewImg2x: image.imageUrl(),
  previewImgWebp: image.imageUrl(),
  previewImgWebp2x: image.imageUrl(),
} as Product);

export const makeFakePromoProduct = (): PromoProduct => ({
  id: datatype.number(),
  name: commerce.productName(),
  previewImg: image.imageUrl(),
  previewImg2x: image.imageUrl(),
  previewImgWebp: image.imageUrl(),
  previewImgWebp2x: image.imageUrl(),
} as PromoProduct);

export const makeFakeReview = (): Review => ({
  id: datatype.uuid(),
  createAt: datatype.datetime().toDateString(),
  cameraId: datatype.number(),
  userName: internet.userName(),
  advantage: lorem.words(14),
  disadvantage: lorem.words(24),
  review: lorem.words(34),
  rating: datatype.number(5),
} as Review);

export const makeFakeComment = (): Comment => ({
  cameraId: datatype.number(),
  userName: internet.userName(),
  advantage: lorem.words(14),
  disadvantage: lorem.words(24),
  review: lorem.words(34),
  rating: datatype.number(5),
} as Comment);

export const makeFakeStore = (initialState?: Partial<State>)=> ({
  [ReducerNames.ProductData]: {
    products: [],
    promoProducts: [],
    isProductsLoading: true,
    productData: {} as Product,
    similarProducts: [],
  },
  [ReducerNames.ReviewsData]: {
    productReviews: [],
    newCommentPending: false,
  },
  ...initialState ?? {},
});

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);
