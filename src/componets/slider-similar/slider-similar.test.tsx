import { render, screen } from '@testing-library/react';
import SliderSimilar from './slider-similar';
import { withHistory } from '../../utils/mock-component';
import { makeFakeProduct } from '../../utils/mocks';


describe('Component: SliderSimilar', () => {
  it('should render correctly', () => {
    const fakeProducts = [makeFakeProduct(), makeFakeProduct()];
    const expectedText = fakeProducts[0].name;
    const preparedComponent = withHistory(<SliderSimilar products={fakeProducts} onAddButtonClick={() => (null)} />);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
