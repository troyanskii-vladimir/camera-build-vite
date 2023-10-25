import { render, screen } from '@testing-library/react';
import CatalogCardsList from './catalog-cards-list';
import { withHistory } from '../../utils/mock-component';
import { makeFakeProduct } from '../../utils/mocks';


describe('Component: CatalogCardsList', () => {
  it('should render correctly', () => {
    const fakeProducts = [makeFakeProduct(), makeFakeProduct()];
    const expectedText = fakeProducts[0].name;
    const preparedComponent = withHistory(<CatalogCardsList products={fakeProducts} onAddButtonClick={() => (null)} />);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
