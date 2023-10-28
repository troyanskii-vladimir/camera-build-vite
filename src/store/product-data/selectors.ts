import { ReducerNames } from '../../config';
import { Product } from '../../types/product';
import { PromoProduct } from '../../types/promo-product';
import { State } from '../../types/state';


export const getProducts = (state: State): Product[] => state[ReducerNames.ProductData].products;
export const getProductData = (state: State): Product => state[ReducerNames.ProductData].productData;
export const getPromoProducts = (state: State): PromoProduct[] => state[ReducerNames.ProductData].promoProducts;
export const getSimilarProducts = (state: State): Product[] => state[ReducerNames.ProductData].similarProducts;
export const getProductsLoadingStatus = (state: State): boolean => state[ReducerNames.ProductData].isProductsLoading;
