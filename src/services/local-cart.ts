import { ProductCart } from '../types/cart';


const CART_DATA_NAME = 'cart-data-new-view';

export const getCartData = (): ProductCart[] => {
  if (localStorage.getItem(CART_DATA_NAME) === null) {
    return [];
  }
  const productCart = JSON.parse(localStorage.getItem(CART_DATA_NAME) || '') as ProductCart[];
  return productCart;
};

export const saveCartData = (productCartItem: ProductCart): void => {
  let productCart: ProductCart[] = [];

  if (localStorage.getItem(CART_DATA_NAME) !== null) {
    productCart = JSON.parse(localStorage.getItem(CART_DATA_NAME) || '') as ProductCart[];
    productCart = productCart.filter((product) => product.id !== productCartItem.id);
  }

  productCart.push(productCartItem);

  localStorage.removeItem(CART_DATA_NAME);
  localStorage.setItem(CART_DATA_NAME, JSON.stringify(productCart));
};

export const dropProductCartData = (productCartItem: ProductCart): void => {
  let productCart: ProductCart[] = [];

  if (localStorage.getItem(CART_DATA_NAME) !== null) {
    productCart = JSON.parse(localStorage.getItem(CART_DATA_NAME) || '') as ProductCart[];
    productCart = productCart.filter((product) => product.id !== productCartItem.id);
  }

  localStorage.removeItem(CART_DATA_NAME);
  localStorage.setItem(CART_DATA_NAME, JSON.stringify(productCart));
};

export const dropCartData = (): void => {
  localStorage.removeItem(CART_DATA_NAME);
};
