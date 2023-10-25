import { render, screen } from '@testing-library/react';
import Header from './header';
import { withHistory } from '../../utils/mock-component';


describe('Component: Header', () => {
  it('should render correctly', () => {
    const expectedPageName = 'Каталог';
    const expectedSecondPageName = 'Гарантии';
    const preparedComponent = withHistory(<Header />);

    render(preparedComponent);

    expect(screen.getByText(expectedPageName)).toBeInTheDocument();
    expect(screen.getByText(expectedSecondPageName)).toBeInTheDocument();
  });
});
