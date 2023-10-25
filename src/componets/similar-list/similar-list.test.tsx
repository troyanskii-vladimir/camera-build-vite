import { render, screen } from '@testing-library/react';
import SimilarList from './similar-list';
import { withHistory } from '../../utils/mock-component';
import { makeFakeProduct } from '../../utils/mocks';


describe('Component: SimilarList', () => {
  it('should render correctly', () => {
    const fakeProducts = [makeFakeProduct(), makeFakeProduct()];
    const expectedText = fakeProducts[0].name;
    const preparedComponent = withHistory(<SimilarList products={fakeProducts} onAddButtonClick={() => (null)} />);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
