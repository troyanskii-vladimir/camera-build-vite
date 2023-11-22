import { render, screen, within } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import App from './app';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute, ReducerNames } from '../../config';
import { makeFakeProduct, makeFakePromoProduct, makeFakeReview, makeFakeStore } from '../../utils/mocks';
import { Product } from '../../types/product';


describe('App Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });


  it('should render catalog page when user navigate to "/" route', () => {
    const fakeProducts = [makeFakeProduct(), makeFakeProduct()];
    const fakeCartProducts = [{...makeFakeProduct(), count: 2}, {...makeFakeProduct(), count: 3}];
    const { withStoreComponent } = withStore(<App />, makeFakeStore({ [ReducerNames.ProductData]: {
      products: fakeProducts,
      promoProducts: [makeFakePromoProduct()],
      isProductsLoading: false,
      productData: {} as Product,
      similarProducts: [],
    },
    [ReducerNames.CartData]: {
      products: fakeCartProducts,
      isCouponChecking: false,
      lastRightCoupon: null,
      discount: 0,
    }}));
    const withHistoryComponent = withHistory(withStoreComponent, mockHistory);
    mockHistory.push(AppRoute.Catalog);
    const expectedText = 'Каталог фото- и видеотехники';

    render(withHistoryComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(fakeProducts[0].name)).toBeInTheDocument();
  });


  it('should render product page when user navigate to "/product/:id" route', () => {
    const fakeProduct = makeFakeProduct();
    const fakeCartProducts = [{...makeFakeProduct(), count: 2}, {...makeFakeProduct(), count: 3}];
    const { withStoreComponent } = withStore(<App />, makeFakeStore({
      [ReducerNames.ProductData]: {
        products: [makeFakeProduct(), fakeProduct],
        promoProducts: [makeFakePromoProduct()],
        isProductsLoading: false,
        productData: fakeProduct,
        similarProducts: [makeFakeProduct()],
      },
      [ReducerNames.CartData]: {
        products: fakeCartProducts,
        isCouponChecking: false,
        lastRightCoupon: null,
        discount: 0,
      },
      [ReducerNames.ReviewsData]: {
        productReviews: [makeFakeReview()],
        newCommentPending: false,
      }
    }));
    const withHistoryComponent = withHistory(withStoreComponent, mockHistory);
    mockHistory.push(`${AppRoute.Product}/${fakeProduct.id}`);
    const expectedText = 'Добавить в корзину';
    const nameTestId = 'productname';

    render(withHistoryComponent);

    const { getByText } = within(screen.getByTestId(nameTestId));

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(getByText(fakeProduct.name)).toBeInTheDocument();
  });


  it('should render basket page when user navigate to "/cart" route', () => {
    const fakeProduct = makeFakeProduct();
    const fakeCartProducts = [{...makeFakeProduct(), count: 2}, {...makeFakeProduct(), count: 3}];
    const { withStoreComponent } = withStore(<App />, makeFakeStore({
      [ReducerNames.ProductData]: {
        products: [makeFakeProduct(), fakeProduct],
        promoProducts: [makeFakePromoProduct()],
        isProductsLoading: false,
        productData: fakeProduct,
        similarProducts: [makeFakeProduct()],
      },
      [ReducerNames.CartData]: {
        products: fakeCartProducts,
        isCouponChecking: false,
        lastRightCoupon: null,
        discount: 0,
      }
    }));
    const withHistoryComponent = withHistory(withStoreComponent, mockHistory);
    mockHistory.push(AppRoute.Cart);
    const expectedText = 'Если у вас есть промокод на скидку, примените его в этом поле';

    render(withHistoryComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(fakeCartProducts[0].name)).toBeInTheDocument();
  });


  it('should render "page not found" when user navigate to non-existent route', () => {
    const { withStoreComponent } = withStore(<App />, makeFakeStore());
    const withHistoryComponent = withHistory(withStoreComponent, mockHistory);
    const unknownRoute = '/unknown-route';
    mockHistory.push(unknownRoute);
    const expectedText = 'Страница не существует';

    render(withHistoryComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
