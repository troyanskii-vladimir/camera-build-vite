import { render, screen } from '@testing-library/react';
import Header from './header';
import { withRouter } from '../../utils/mock-component';


describe('Component: Header', () => {
  it('should render correctly', () => {
    const expectedPageName = 'Каталог';
    const expectedSecondPageName = 'Гарантии';
    const preparedComponent = withRouter(<Header />);

    render(preparedComponent);

    expect(screen.getByText(expectedPageName)).toBeInTheDocument();
    expect(screen.getByText(expectedSecondPageName)).toBeInTheDocument();
  });
});
