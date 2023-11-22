import { render, screen } from '@testing-library/react';
import BasketList from './basket-list';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeCartProduct, makeFakeStore } from '../../utils/mocks';


describe('Component: BasketList', () => {
  it('should render correctly', () => {
    const mockCartProducts = [makeFakeCartProduct(), makeFakeCartProduct()];
    const expectedText = mockCartProducts[0].name;
    const { withStoreComponent } = withStore(<BasketList products={mockCartProducts} onDeleteButtonClick={() => (null)} />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
