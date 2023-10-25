import { render, screen } from '@testing-library/react';
import CatalogSidebar from './catalog-sidebar';


describe('Component: CatalogSidebar', () => {
  it('should render correctly', () => {
    const expectedText = 'Фильтр';

    render(<CatalogSidebar />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
