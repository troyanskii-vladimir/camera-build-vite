import { render, screen } from '@testing-library/react';
import Banner from './banner';
import { withHistory } from '../../utils/mock-component';
import { makeFakePromoProduct } from '../../utils/mocks';


describe('Component: Banner', () => {
  it('should render correctly', () => {
    const fakePromoProduct = makeFakePromoProduct();
    const expectedText = fakePromoProduct.name;
    const preparedComponent = withHistory(<Banner product={fakePromoProduct} />);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
