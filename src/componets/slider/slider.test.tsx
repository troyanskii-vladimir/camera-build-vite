import { render, screen } from '@testing-library/react';
import Slider from './slider';
import { withHistory } from '../../utils/mock-component';
import { makeFakeProduct } from '../../utils/mocks';


describe('Component: Slider', () => {
  it('should render correctly', () => {
    const fakePromoProducts = [makeFakeProduct(), makeFakeProduct()];
    const expectedText = fakePromoProducts[0].name;
    const preparedComponent = withHistory(<Slider products={fakePromoProducts} />);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
