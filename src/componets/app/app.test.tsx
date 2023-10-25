import { render, screen, within } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import App from './app';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute } from '../../config';
import { makeFakeProduct, makeFakePromoProduct, makeFakeReview, makeFakeStore } from '../../utils/mocks';


describe('App Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });


  it('should render catalog page when user navigate to "/" route', () => {
    const fakeProducts = [makeFakeProduct(), makeFakeProduct()];
    const { withStoreComponent } = withStore(<App />, makeFakeStore({
      products: fakeProducts,
      promoProducts: [makeFakePromoProduct()],
      isProductsLoading: false,
    }));
    const withHistoryComponent = withHistory(withStoreComponent, mockHistory);
    mockHistory.push(AppRoute.Catalog);
    const expectedText = 'Каталог фото- и видеотехники';

    render(withHistoryComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(fakeProducts[0].name)).toBeInTheDocument();
  });


  it('should render product page when user navigate to "/" route', () => {
    const fakeProduct = makeFakeProduct();
    const { withStoreComponent } = withStore(<App />, makeFakeStore({
      products: [makeFakeProduct(), fakeProduct],
      productData: fakeProduct,
      similarProducts: [makeFakeProduct()],
      isProductsLoading: false,
      productReviews: [makeFakeReview()],
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
