import { makeFakeCartProduct } from '../../utils/mocks';
import { addNewProduct, addProductsToCart, changeDiscount, changeProduct, cleanCart, deleteProduct, setCouponPending, setLastCorrectCoupon } from './actions';
import { CartData } from './cart-data';


describe('Cart data reducer', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      products: [],
      isCouponChecking: false,
      lastRightCoupon: null,
      discount: 0,
    };

    const result = CartData(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });


  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      products: [],
      isCouponChecking: false,
      lastRightCoupon: null,
      discount: 0,
    };

    const result = CartData(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });


  it('should change status isCouponChecking with "setCouponPending" action', () => {
    const initialState = {
      products: [],
      isCouponChecking: false,
      lastRightCoupon: null,
      discount: 0,
    };
    const expectedState = {
      products: [],
      isCouponChecking: true,
      lastRightCoupon: null,
      discount: 0,
    };

    const result = CartData(initialState, setCouponPending(true));

    expect(result).toEqual(expectedState);
  });


  it('should add product with "addNewProduct" action', () => {
    const initialState = {
      products: [],
      isCouponChecking: false,
      lastRightCoupon: null,
      discount: 0,
    };
    const fakeProduct = makeFakeCartProduct();
    const expectedState = {
      products: [fakeProduct],
      isCouponChecking: false,
      lastRightCoupon: null,
      discount: 0,
    };

    const result = CartData(initialState, addNewProduct(fakeProduct));

    expect(result).toEqual(expectedState);
  });

  it('should change products with "addProductsToCart" action', () => {
    const initialState = {
      products: [],
      isCouponChecking: false,
      lastRightCoupon: null,
      discount: 0,
    };
    const fakeProduct = makeFakeCartProduct();
    const expectedState = {
      products: [fakeProduct],
      isCouponChecking: false,
      lastRightCoupon: null,
      discount: 0,
    };

    const result = CartData(initialState, addProductsToCart([fakeProduct]));

    expect(result).toEqual(expectedState);
  });


  it('should change discount with "changeDiscount" action', () => {
    const initialState = {
      products: [],
      isCouponChecking: false,
      lastRightCoupon: null,
      discount: 0,
    };
    const fakeDiscount = 31;
    const expectedState = {
      products: [],
      isCouponChecking: false,
      lastRightCoupon: null,
      discount: fakeDiscount,
    };

    const result = CartData(initialState, changeDiscount(fakeDiscount));

    expect(result).toEqual(expectedState);
  });


  it('should change product with "changeProduct" action', () => {
    const fakeProductFirst = makeFakeCartProduct();
    const fakeProductSecond = {...fakeProductFirst, count: 10};
    const initialState = {
      products: [fakeProductFirst],
      isCouponChecking: false,
      lastRightCoupon: null,
      discount: 0,
    };
    const expectedState = {
      products: [fakeProductSecond],
      isCouponChecking: false,
      lastRightCoupon: null,
      discount: 0,
    };

    const result = CartData(initialState, changeProduct(fakeProductSecond));

    expect(result).toEqual(expectedState);
  });


  it('should refresh cart with "cleanCart" action', () => {
    const initialState = {
      products: [makeFakeCartProduct()],
      isCouponChecking: false,
      lastRightCoupon: 'camera-111',
      discount: 25,
    };
    const expectedState = {
      products: [],
      isCouponChecking: false,
      lastRightCoupon: null,
      discount: 0,
    };

    const result = CartData(initialState, cleanCart());

    expect(result).toEqual(expectedState);
  });


  it('should delete product from cart with "deleteProduct" action', () => {
    const fakeProductFirst = makeFakeCartProduct();
    const fakeProductSecond = makeFakeCartProduct();
    const initialState = {
      products: [fakeProductFirst, fakeProductSecond],
      isCouponChecking: false,
      lastRightCoupon: null,
      discount: 0,
    };
    const expectedState = {
      products: [fakeProductSecond],
      isCouponChecking: false,
      lastRightCoupon: null,
      discount: 0,
    };

    const result = CartData(initialState, deleteProduct(fakeProductFirst));

    expect(result).toEqual(expectedState);
  });


  it('should set coupon value with "setLastCorrectCoupon" action', () => {
    const initialState = {
      products: [],
      isCouponChecking: false,
      lastRightCoupon: null,
      discount: 0,
    };
    const fakeCoupon = 'test11';
    const expectedState = {
      products: [],
      isCouponChecking: false,
      lastRightCoupon: fakeCoupon,
      discount: 0,
    };

    const result = CartData(initialState, setLastCorrectCoupon(fakeCoupon));

    expect(result).toEqual(expectedState);
  });
});
