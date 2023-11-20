import { ReducerNames } from '../../config';
import { ProductCart } from '../../types/cart';
import { State } from '../../types/state';

export const getProductsCart = (state: State): ProductCart[] => state[ReducerNames.CartData].products;
