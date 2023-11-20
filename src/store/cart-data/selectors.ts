import { ReducerNames } from '../../config';
import { ProductCart } from '../../types/cart';
import { State } from '../../types/state';

export const getProductsCart = (state: State): ProductCart[] => state[ReducerNames.CartData].products;
export const getDiscount = (state: State): number => state[ReducerNames.CartData].discount;
export const getLastCorrectCoupon = (state: State): string | null => state[ReducerNames.CartData].lastRightCoupon;
