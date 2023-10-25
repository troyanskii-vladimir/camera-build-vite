import { render, screen } from '@testing-library/react';
import CatalogCardItem from './catalog-card-item';
import { withHistory } from '../../utils/mock-component';
import { makeFakeProduct } from '../../utils/mocks';


describe('Component: CatalogCardItem', () => {
  it('should render correctly', () => {
    const fakeProduct = makeFakeProduct();
    const expectedText = fakeProduct.name;
    const preparedComponent = withHistory(<CatalogCardItem product={fakeProduct} onAddButtonClick={() => (null)} />);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
