import { render, screen } from '@testing-library/react';
import CatalogSidebar from './catalog-sidebar';
import { withHistory } from '../../utils/mock-component';
import { FilterCamera, FilterLevel, FilterType } from '../../types/sort';


describe('Component: CatalogSidebar', () => {
  const fakePriceDown = 100;
  const fakePriceUp = 200000;

  it('should render correctly', () => {
    const expectedText = 'Фильтр';
    const preparedComponent = withHistory(
      <CatalogSidebar
        typePrice={fakePriceDown}
        typePriceUp={fakePriceUp}
        typeProduct={FilterCamera.Any}
        typeCamera={FilterType.Any}
        typeLevel={FilterLevel.Any}
        onFilterPriceSubmit={() => (null)}
        onFilterSubmit={() => (null)}
        onFilterRefresh={() => (null)}
        setCorrectPrice={() => (null)}
      />
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByDisplayValue(fakePriceDown)).toBeInTheDocument();
    expect(screen.getByDisplayValue(fakePriceUp)).toBeInTheDocument();
  });
});
