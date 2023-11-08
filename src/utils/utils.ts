import { Product } from '../types/product';


export function sortPointsByRatingToTop (a: Product, b: Product): number {
  return a.rating > b.rating ? 1 : -1;
}

export function sortPointsByRatingToLow (a: Product, b: Product): number {
  return a.rating < b.rating ? 1 : -1;
}

export function sortPointsByPriceToTop (a: Product, b: Product): number {
  return a.price > b.price ? 1 : -1;
}

export function sortPointsByPriceToLow (a: Product, b: Product): number {
  return a.price < b.price ? 1 : -1;
}
