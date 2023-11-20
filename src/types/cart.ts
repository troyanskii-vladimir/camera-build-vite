import { Product } from './product';


export type ProductCart = Product & {
  count: number;
}
