import { SortOrder, SortType } from '../../types/sort';


type CatalogSortProps = {
  orderBy: SortType;
  orderDirection: SortOrder;
  onChangeSortTypeCLick: (sortType: SortType) => void;
  onChangeSortOrderCLick: (sortOrder: SortOrder) => void;
};


function CatalogSort({orderBy, orderDirection, onChangeSortTypeCLick, onChangeSortOrderCLick}: CatalogSortProps): JSX.Element {

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPrice"
                name="sort"
                checked={orderBy === SortType.Price}
                onChange={() => {
                  onChangeSortTypeCLick(SortType.Price);
                }}
                data-testid='filterPrice'
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPopular"
                name="sort"
                checked={orderBy === SortType.Rating}
                onChange={() => {
                  onChangeSortTypeCLick(SortType.Rating);
                }}
                data-testid='filterRating'
              />
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input
                type="radio"
                id="up"
                name="sort-icon"
                checked={orderDirection === SortOrder.ToTop}
                aria-label="По возрастанию"
                onChange={() => {
                  onChangeSortOrderCLick(SortOrder.ToTop);
                }}
                data-testid='filterToTop'
              />
              <label htmlFor="up">
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#icon-sort" />
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input
                type="radio"
                id="down"
                name="sort-icon"
                aria-label="По убыванию"
                checked={orderDirection === SortOrder.ToLow}
                onChange={() => {
                  onChangeSortOrderCLick(SortOrder.ToLow);
                }}
                data-testid='filterToLow'
              />
              <label htmlFor="down">
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#icon-sort" />
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CatalogSort;
