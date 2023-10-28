import { Product } from '../../types/product';
import { makeFakeProduct, makeFakePromoProduct } from '../../utils/mocks';
import { loadProductData, loadProducts, loadPromoProducts, loadSimilarProducts, setProductsLoading } from './actions';
import { ProductData } from './product-data';


describe('Product data reducer', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      products: [],
      promoProducts: [],
      isProductsLoading: true,
      productData: {} as Product,
      similarProducts: [],
    };

    const result = ProductData(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });


  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      products: [],
      promoProducts: [],
      isProductsLoading: true,
      productData: {} as Product,
      similarProducts: [],
    };

    const result = ProductData(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });


  it('should change status loading with "setProductsLoading" action', () => {
    const initialState = {
      products: [],
      promoProducts: [],
      isProductsLoading: false,
      productData: {} as Product,
      similarProducts: [],
    };
    const expectedState = {
      products: [],
      promoProducts: [],
      isProductsLoading: true,
      productData: {} as Product,
      similarProducts: [],
    };

    const result = ProductData(initialState, setProductsLoading(true));

    expect(result).toEqual(expectedState);
  });


  it('should add products with "loadProducts" action', () => {
    const initialState = {
      products: [],
      promoProducts: [],
      isProductsLoading: false,
      productData: {} as Product,
      similarProducts: [],
    };
    const product = makeFakeProduct();
    const expectedState = {
      products: [product],
      promoProducts: [],
      isProductsLoading: false,
      productData: {} as Product,
      similarProducts: [],
    };

    const result = ProductData(initialState, loadProducts([product]));

    expect(result).toEqual(expectedState);
  });


  it('should add promo products with "loadPromoProducts" action', () => {
    const initialState = {
      products: [],
      promoProducts: [],
      isProductsLoading: false,
      productData: {} as Product,
      similarProducts: [],
    };
    const promoProduct = makeFakePromoProduct();
    const expectedState = {
      products: [],
      promoProducts: [promoProduct],
      isProductsLoading: false,
      productData: {} as Product,
      similarProducts: [],
    };

    const result = ProductData(initialState, loadPromoProducts([promoProduct]));

    expect(result).toEqual(expectedState);
  });


  it('should add product with "loadProductData" action', () => {
    const initialState = {
      products: [],
      promoProducts: [],
      isProductsLoading: false,
      productData: {} as Product,
      similarProducts: [],
    };
    const product = makeFakeProduct();
    const expectedState = {
      products: [],
      promoProducts: [],
      isProductsLoading: false,
      productData: product,
      similarProducts: [],
    };

    const result = ProductData(initialState, loadProductData(product));

    expect(result).toEqual(expectedState);
  });


  it('should add similar products with "loadSimilarProducts" action', () => {
    const initialState = {
      products: [],
      promoProducts: [],
      isProductsLoading: false,
      productData: {} as Product,
      similarProducts: [],
    };
    const product = makeFakeProduct();
    const expectedState = {
      products: [],
      promoProducts: [],
      isProductsLoading: false,
      productData: {} as Product,
      similarProducts: [product],
    };

    const result = ProductData(initialState, loadSimilarProducts([product]));

    expect(result).toEqual(expectedState);
  });
});
