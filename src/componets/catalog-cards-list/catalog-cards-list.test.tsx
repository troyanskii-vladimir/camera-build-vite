import { render, screen } from '@testing-library/react';
import CatalogCardsList from './catalog-cards-list';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeCartProduct, makeFakeProduct, makeFakeStore } from '../../utils/mocks';
import { ReducerNames } from '../../config';


describe('Component: CatalogCardsList', () => {
  const fakeProducts = [makeFakeProduct(), makeFakeProduct()];
  const fakeCartProducts = [makeFakeCartProduct(), makeFakeCartProduct()];

  it('should render correctly with products', () => {
    const expectedText = fakeProducts[0].name;
    const withHistoryComponent = withHistory(<CatalogCardsList products={fakeProducts} productsInCart={fakeCartProducts} onAddButtonClick={() => (null)} />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      [ReducerNames.ProductData]: {
        products: [],
        productData: makeFakeProduct(),
        promoProducts: [],
        isProductsLoading: false,
        similarProducts: [],
      }
    }));

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render correctly when products loading', () => {
    const expectedText = /Загрузка/i;
    const withHistoryComponent = withHistory(<CatalogCardsList products={fakeProducts} productsInCart={fakeCartProducts} onAddButtonClick={() => (null)} />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      [ReducerNames.ProductData]: {
        products: [],
        productData: makeFakeProduct(),
        promoProducts: [],
        isProductsLoading: true,
        similarProducts: [],
      }
    }));

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render correctly with empty products', () => {
    const expectedText = /ничего не найдено/i;
    const withHistoryComponent = withHistory(<CatalogCardsList products={[]} productsInCart={fakeCartProducts} onAddButtonClick={() => (null)} />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      [ReducerNames.ProductData]: {
        products: [],
        productData: makeFakeProduct(),
        promoProducts: [],
        isProductsLoading: false,
        similarProducts: [],
      }
    }));

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
