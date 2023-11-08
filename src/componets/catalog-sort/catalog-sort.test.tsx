import { render, screen } from '@testing-library/react';
import CatalogSort from './catalog-sort';
import { withHistory } from '../../utils/mock-component';
import { SortOrder, SortType } from '../../types/sort';


describe('Component: CatalogSort', () => {
  const priceDataId = 'filterPrice';
  const ratingDataId = 'filterRating';
  const toTopDataId = 'filterToTop';
  const toLowDataId = 'filterToLow';

  it('should render correctly', () => {
    const expectedText = 'Сортировать:';
    const preparedComponent = withHistory(<CatalogSort orderBy={SortType.Unsort} orderDirection={SortOrder.Unsort} onChangeSortTypeCLick={() => null} onChangeSortOrderCLick={() => null} />);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId(priceDataId)).not.toBeChecked();
    expect(screen.getByTestId(ratingDataId)).not.toBeChecked();
    expect(screen.getByTestId(toTopDataId)).not.toBeChecked();
    expect(screen.getByTestId(toLowDataId)).not.toBeChecked();
  });

  it('should render correctly with checked props', () => {
    const preparedComponent = withHistory(<CatalogSort orderBy={SortType.Price} orderDirection={SortOrder.ToTop} onChangeSortTypeCLick={() => null} onChangeSortOrderCLick={() => null} />);

    render(preparedComponent);

    expect(screen.getByTestId(priceDataId)).toBeChecked();
    expect(screen.getByTestId(ratingDataId)).not.toBeChecked();
    expect(screen.getByTestId(toTopDataId)).toBeChecked();
    expect(screen.getByTestId(toLowDataId)).not.toBeChecked();
  });
});
