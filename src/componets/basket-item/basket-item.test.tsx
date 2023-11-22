import { render, screen } from '@testing-library/react';
import BasketItem from './basket-item';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeCartProduct, makeFakeStore } from '../../utils/mocks';


describe('Component: BasketItem', () => {
  it('should render correctly', () => {
    const mockCartProduct = makeFakeCartProduct();
    const expectedText = mockCartProduct.name;
    const { withStoreComponent } = withStore(<BasketItem product={mockCartProduct} onDeleteButtonClick={() => null} />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
