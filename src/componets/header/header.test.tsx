import { render, screen } from '@testing-library/react';
import Header from './header';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeProduct, makeFakeStore } from '../../utils/mocks';
import { ReducerNames } from '../../config';
import userEvent from '@testing-library/user-event';


describe('Component: Header', () => {
  const fakeProduct = makeFakeProduct();

  it('should render correctly', () => {
    const expectedPageName = 'Каталог';
    const expectedSecondPageName = 'Гарантии';
    const { withStoreComponent } = withStore(<Header />, makeFakeStore({
      [ReducerNames.ProductData]: {
        products: [fakeProduct],
        productData: fakeProduct,
        promoProducts: [],
        isProductsLoading: false,
        similarProducts: [],
      }
    }));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedPageName)).toBeInTheDocument();
    expect(screen.getByText(expectedSecondPageName)).toBeInTheDocument();
  });

  it('should render correctly when user enter part of text in input', async () => {
    const searchInputElement = 'searchInputElement';
    const expectedOutputValue = fakeProduct.name;
    const expectedInputValue = expectedOutputValue.slice(0, 5);
    const { withStoreComponent } = withStore(<Header />, makeFakeStore({
      [ReducerNames.ProductData]: {
        products: [fakeProduct],
        productData: makeFakeProduct(),
        promoProducts: [],
        isProductsLoading: false,
        similarProducts: [],
      }
    }));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    await userEvent.type(
      screen.getByTestId(searchInputElement),
      expectedInputValue,
    );

    expect(screen.queryByText(expectedOutputValue)).toBeInTheDocument();
  });
});
