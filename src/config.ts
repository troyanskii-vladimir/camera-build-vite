export const COUNT_OF_NUMBERS_PAGINATION = 3;
export const MIN_COUNT_OF_TEXT_SYNBOLS = 2;
export const MAX_COUNT_OF_TEXT_SYNBOLS = 160;
export const COUNT_OF_REVIEWS_PART = 3;
export const COUNT_OF_SIMILAR_PRODUCTS_ON_PAGE = 3;
export const DISPLAYED_PRODUCTS = 9;
export const COUNT_OF_RATING_STARS = 5;
export const BACKEND_URL = 'https://camera-shop.accelerator.pages.academy';
export const REQUEST_TIMEOUT = 5000;
export const MIN_COUNT_OF_PRODUCT_IN_BASKET = 1;
export const MAX_COUNT_OF_PRODUCT_IN_BASKET = 99;

export enum AppRoute {
  Catalog = '/',
  Product = '/product',
  Cart = '/cart',
}

export enum APIRoute {
  Cameras = '/cameras',
  Promo = '/promo',
  Similar = '/similar',
  Reviews = '/reviews',
}

export enum ReducerNames {
  ProductData = 'ProductData',
  ReviewsData = 'ReviewsData',
  CartData = 'CartData',
}
