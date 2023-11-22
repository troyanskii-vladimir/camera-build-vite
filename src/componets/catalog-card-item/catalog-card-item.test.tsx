import { render, screen } from '@testing-library/react';
import CatalogCardItem from './catalog-card-item';
import { withHistory } from '../../utils/mock-component';
import { makeFakeCartProduct, makeFakeProduct } from '../../utils/mocks';


describe('Component: CatalogCardItem', () => {
  it('should render correctly', () => {
    const fakeProduct = makeFakeProduct();
    const fakeCartProducts = [makeFakeCartProduct()];
    const expectedText = fakeProduct.name;
    const preparedComponent = withHistory(<CatalogCardItem product={fakeProduct} productsInCart={fakeCartProducts} onAddButtonClick={() => (null)} />);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
