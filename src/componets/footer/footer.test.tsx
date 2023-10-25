import { render, screen } from '@testing-library/react';
import Footer from './footer';
import { withHistory } from '../../utils/mock-component';


describe('Component: Footer', () => {
  it('should render correctly', () => {
    const expectedPageName = 'Интернет-магазин фото- и видеотехники';
    const expectedSecondPageName = 'Каталог';
    const preparedComponent = withHistory(<Footer />);

    render(preparedComponent);

    expect(screen.getByText(expectedPageName)).toBeInTheDocument();
    expect(screen.getByText(expectedSecondPageName)).toBeInTheDocument();
  });
});
