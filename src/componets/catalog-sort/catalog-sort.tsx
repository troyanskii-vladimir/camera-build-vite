import { useEffect, useState } from 'react';
import browserHistory from '../../browser-history';
import { AppRoute } from '../../config';
import { useLocation } from 'react-router-dom';

enum SortType {
  Price = 'price',
  Marks = 'marks',
}

enum SortOrder {
  ToTop = 'totop',
  ToLow = 'tolow',
}

function CatalogSort(): JSX.Element {
  const [sortParams, setSortParams] = useState({
    type: SortType.Price,
    order: SortOrder.ToTop,
  });

  const location = useLocation();
  const extraUrl = location.search;

  const [extraUrlWithoutSort, setExtraUrlWithoutSort] = useState(extraUrl);

  useEffect(() => {
    setSortParams({
      type: SortType.Price,
      order: SortOrder.ToTop,
    });

    if (extraUrl.match(/sort/i)) {
      const sortNumberElement = Number(extraUrl.match(/sort/i)?.index) + 5;

      const sortType = extraUrl.slice(sortNumberElement, sortNumberElement + 5) as SortType;
      const sortOrder = extraUrl.slice(sortNumberElement + 5, sortNumberElement + 10) as SortOrder;

      setExtraUrlWithoutSort(extraUrl.replace(sortType, '').replace(sortOrder, '').replace('?sort=', ''));

      setSortParams({
        type: sortType,
        order: sortOrder,
      });
    }

  }, [extraUrl]);


  const onSetPriceButtonClick = () => {
    setSortParams({
      type: SortType.Price,
      order: sortParams.order,
    });
    browserHistory.push(`${AppRoute.Catalog}?sort=${SortType.Price}${sortParams.order}${extraUrlWithoutSort}`);
  };

  const onSetMarksButtonClick = () => {
    setSortParams({
      type: SortType.Marks,
      order: sortParams.order,
    });
    browserHistory.push(`${AppRoute.Catalog}?sort=${SortType.Marks}${sortParams.order}${extraUrlWithoutSort}`);
  };

  const onSetToTopButtonClick = () => {
    setSortParams({
      type: sortParams.type,
      order: SortOrder.ToTop,
    });
    browserHistory.push(`${AppRoute.Catalog}?sort=${sortParams.type}${SortOrder.ToTop}${extraUrlWithoutSort}`);
  };

  const onSetToLowButtonClick = () => {
    setSortParams({
      type: sortParams.type,
      order: SortOrder.ToLow,
    });
    browserHistory.push(`${AppRoute.Catalog}?sort=${sortParams.type}${SortOrder.ToLow}${extraUrlWithoutSort}`);
  };


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
                checked={sortParams.type === SortType.Price}
                onChange={onSetPriceButtonClick}
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPopular"
                name="sort"
                checked={sortParams.type === SortType.Marks}
                onChange={onSetMarksButtonClick}
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
                checked={sortParams.order === SortOrder.ToTop}
                aria-label="По возрастанию"
                onChange={onSetToTopButtonClick}
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
                checked={sortParams.order === SortOrder.ToLow}
                onChange={onSetToLowButtonClick}
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
