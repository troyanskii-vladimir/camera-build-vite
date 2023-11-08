import { render, screen } from '@testing-library/react';
import Pagination from './pagination';
import { withHistory } from '../../utils/mock-component';
import { makeFakeProduct } from '../../utils/mocks';
import { DISPLAYED_PRODUCTS } from '../../config';


describe('Component: Pagination', () => {
  it('should display 1,2,3 pages and button "next" when current page 1', () => {
    const fakeProducts = Array(100).fill(makeFakeProduct());
    const countOfPages = Math.ceil(fakeProducts.length / DISPLAYED_PRODUCTS);
    const preparedComponent = withHistory(<Pagination currentPage={1} countOfPages={countOfPages} onNumberButtonClick={() => (null)} />);

    render(preparedComponent);

    expect(screen.queryByText('Назад')).not.toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.queryByText('Далее')).toBeInTheDocument();
  });


  it('should display 4,5,6 pages and button "prev/next" when current page 5', () => {
    const fakeProducts = Array(100).fill(makeFakeProduct());
    const countOfPages = Math.ceil(fakeProducts.length / DISPLAYED_PRODUCTS);
    const preparedComponent = withHistory(<Pagination currentPage={5} countOfPages={countOfPages} onNumberButtonClick={() => (null)} />);

    render(preparedComponent);

    expect(screen.getByText('Назад')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('Далее')).toBeInTheDocument();
  });


  it('should display 10,11,12 pages and button "prev" when current page 12', () => {
    const fakeProducts = Array(100).fill(makeFakeProduct());
    const countOfPages = Math.ceil(fakeProducts.length / DISPLAYED_PRODUCTS);
    const preparedComponent = withHistory(<Pagination currentPage={12} countOfPages={countOfPages} onNumberButtonClick={() => (null)} />);

    render(preparedComponent);

    expect(screen.queryByText('Назад')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('11')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.queryByText('Далее')).not.toBeInTheDocument();
  });
});
