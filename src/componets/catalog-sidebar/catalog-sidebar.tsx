import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { FilterCamera, FilterLevel, FilterType } from '../../types/sort';


type CatalogSidebarProps = {
  typePrice: number | '';
  typePriceUp: number | '';
  typeProduct: FilterCamera;
  typeCamera: FilterType[];
  typeLevel: FilterLevel[];
  minPriceTemp: number;
  maxPriceTemp: number;
  onFilterSubmit: (filter: Filter) => void;
  onFilterPriceSubmit: (filterPrice: FilterPrice) => void;
  onFilterRefresh: () => void;
  setCorrectPriceMin: (priceMin: number) => void;
  setCorrectPriceMax: (priceMax: number) => void;
}

type FilterHandler = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export type FilterPrice = {
  price: number | '';
  priceUp: number | '';
}

export type Filter = {
  camera: FilterCamera;
  type: FilterType[];
  level: FilterLevel[];
}


function CatalogSidebar({
  typePrice,
  typePriceUp,
  typeProduct,
  typeCamera,
  typeLevel,
  minPriceTemp,
  maxPriceTemp,
  onFilterSubmit,
  onFilterPriceSubmit,
  onFilterRefresh,
  setCorrectPriceMin,
  setCorrectPriceMax,
}: CatalogSidebarProps): JSX.Element {

  const timeoutIdRef = useRef<ReturnType<typeof setTimeout>>();

  const [filter, setFilter] = useState<Filter>({
    camera: typeProduct,
    type: typeCamera,
    level: typeLevel,
  });

  const [filterPrice, setFilterPrice] = useState<FilterPrice>({
    price: typePrice,
    priceUp: typePriceUp,
  });

  useEffect(() => {
    setFilter({
      camera: typeProduct,
      type: typeCamera,
      level: typeLevel,
    });

    setFilterPrice({
      price: typePrice,
      priceUp: typePriceUp,
    });
  }, [typePrice, typePriceUp, typeProduct, typeCamera, typeLevel]);


  const handleFilterRefresh = () => {
    onFilterRefresh();
  };

  const handleFilterPriceChange = ({target}: FilterHandler) => {
    onFilterPriceSubmit({
      ...filterPrice,
      [target.name]: target.value,
    });

    if (target.name === 'price') {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = setTimeout(() => {
        setCorrectPriceMin(Number(target.value));
      }, 1000);
    }

    if (target.name === 'priceUp') {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = setTimeout(() => {
        setCorrectPriceMax(Number(target.value));
      }, 1000);
    }
  };

  const handleProductChange = ({ target }: FilterHandler) => {
    if (filter.camera === target.value) {
      onFilterSubmit({
        ...filter,
        camera: FilterCamera.Any,
      });
    } else {
      onFilterSubmit({
        ...filter,
        [target.name]: target.value,
      });
    }
  };

  const handleTypeChange = ({ target }: FilterHandler) => {
    const clickedType = target.value as FilterType;
    if (filter.type.includes(clickedType)) {
      const typeArray = filter.type.filter((type) => type !== clickedType);
      onFilterSubmit({
        ...filter,
        [target.name]: typeArray,
      });
    } else {
      const typeArray = [...filter.type];
      typeArray.push(clickedType);
      onFilterSubmit({
        ...filter,
        [target.name]: typeArray,
      });
    }
  };

  const handleLevelChange = ({ target }: FilterHandler) => {
    const clickedLevel = target.value as FilterLevel;
    if (filter.level.includes(clickedLevel)) {
      const levelArray = filter.level.filter((type) => type !== clickedLevel);
      onFilterSubmit({
        ...filter,
        [target.name]: levelArray,
      });
    } else {
      const levelArray = [...filter.level];
      levelArray.push(clickedLevel);
      onFilterSubmit({
        ...filter,
        [target.name]: levelArray,
      });
    }
  };

  return (
    <div className="catalog__aside">
      <div className="catalog-filter">
        <form action="#">
          <h2 className="visually-hidden">Фильтр</h2>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Цена, ₽</legend>
            <div className="catalog-filter__price-range">
              <div className="custom-input">
                <label>
                  <input
                    type="number"
                    name="price"
                    placeholder={String(minPriceTemp)}
                    value={typePrice}
                    onChange={handleFilterPriceChange}
                    data-testid='filterPrice'
                  />
                </label>
              </div>
              <div className="custom-input">
                <label>
                  <input
                    type="number"
                    name="priceUp"
                    placeholder={String(maxPriceTemp)}
                    value={typePriceUp}
                    onChange={handleFilterPriceChange}
                    data-testid='filterPriceUp'
                  />
                </label>
              </div>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Категория</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="camera"
                  value={FilterCamera.Photo}
                  checked={typeProduct === FilterCamera.Photo}
                  onChange={handleProductChange}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">
                  Фотокамера
                </span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="camera"
                  value={FilterCamera.Video}
                  checked={typeProduct === FilterCamera.Video}
                  onChange={handleProductChange}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">
                  Видеокамера
                </span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Тип камеры</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="type"
                  value={FilterType.Digital}
                  checked={typeCamera.includes(FilterType.Digital)}
                  onChange={handleTypeChange}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">Цифровая</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="type"
                  value={FilterType.Film}
                  checked={typeCamera.includes(FilterType.Film)}
                  disabled={typeProduct === FilterCamera.Video}
                  onChange={handleTypeChange}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">
                  Плёночная
                </span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="type"
                  value={FilterType.Snapshot}
                  checked={typeCamera.includes(FilterType.Snapshot)}
                  disabled={typeProduct === FilterCamera.Video}
                  onChange={handleTypeChange}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">
                  Моментальная
                </span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="type"
                  value={FilterType.Collection}
                  checked={typeCamera.includes(FilterType.Collection)}
                  onChange={handleTypeChange}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">
                  Коллекционная
                </span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Уровень</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="level"
                  value={FilterLevel.Nullable}
                  checked={typeLevel.includes(FilterLevel.Nullable)}
                  onChange={handleLevelChange}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">Нулевой</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="level"
                  value={FilterLevel.Amateur}
                  checked={typeLevel.includes(FilterLevel.Amateur)}
                  onChange={handleLevelChange}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">
                  Любительский
                </span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="level"
                  value={FilterLevel.Professional}
                  checked={typeLevel.includes(FilterLevel.Professional)}
                  onChange={handleLevelChange}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">
                  Профессиональный
                </span>
              </label>
            </div>
          </fieldset>
          <button
            className="btn catalog-filter__reset-btn"
            type="reset"
            onClick={handleFilterRefresh}
          >
            Сбросить фильтры
          </button>
        </form>
      </div>
    </div>
  );
}

export default CatalogSidebar;
