import { ChangeEvent, useState } from 'react';
import { FilterCamera, FilterLevel, FilterType } from '../../types/sort';

type CatalogSidebarProps = {
  typeProduct: FilterCamera;
  typeCamera: FilterType;
  typeLevel: FilterLevel;
  onFilterSubmit: (filter: Filter) => void;
}

type FilterHandler = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export type Filter = {
  camera: FilterCamera;
  type: FilterType;
  level: FilterLevel;
}


function CatalogSidebar({typeProduct, typeCamera, typeLevel, onFilterSubmit}: CatalogSidebarProps): JSX.Element {
  const [filter, setFilter] = useState<Filter>({
    camera: typeProduct,
    type: typeCamera,
    level: typeLevel,
  });

  const handleFilterRefresh = () => {
    onFilterSubmit({
      camera: FilterCamera.Any,
      type: FilterType.Any,
      level: FilterLevel.Any,
    });

    setFilter({
      camera: FilterCamera.Any,
      type: FilterType.Any,
      level: FilterLevel.Any,
    });
  };

  const handleFilterChange = ({ target }: FilterHandler) => {
    onFilterSubmit({
      ...filter,
      [target.name]: target.value,
    });

    setFilter({
      ...filter,
      [target.name]: target.value,
    });
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
                  <input type="number" name="price" placeholder="от" />
                </label>
              </div>
              <div className="custom-input">
                <label>
                  <input
                    type="number"
                    name="priceUp"
                    placeholder="до"
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
                  // name="photocamera"
                  name="camera"
                  value={FilterCamera.Photo}
                  checked={typeProduct === FilterCamera.Photo}
                  onChange={handleFilterChange}
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
                  // name="videocamera"
                  name="camera"
                  value={FilterCamera.Video}
                  checked={typeProduct === FilterCamera.Video}
                  onChange={handleFilterChange}
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
                  // name="digital"
                  name="type"
                  value={FilterType.Digital}
                  checked={typeCamera === FilterType.Digital}
                  onChange={handleFilterChange}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">Цифровая</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  // name="film"
                  name="type"
                  value={FilterType.Film}
                  checked={typeCamera === FilterType.Film}
                  onChange={handleFilterChange}
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
                  // name="snapshot"
                  name="type"
                  value={FilterType.Snapshot}
                  checked={typeCamera === FilterType.Snapshot}
                  onChange={handleFilterChange}
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
                  // name="collection"
                  name="type"
                  value={FilterType.Collection}
                  checked={typeCamera === FilterType.Collection}
                  onChange={handleFilterChange}
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
                  // name="zero"
                  name="level"
                  value={FilterLevel.Nullable}
                  checked={typeLevel === FilterLevel.Nullable}
                  onChange={handleFilterChange}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">Нулевой</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  // name="non-professional"
                  name="level"
                  value={FilterLevel.Amateur}
                  checked={typeLevel === FilterLevel.Amateur}
                  onChange={handleFilterChange}
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
                  // name="professional"
                  name="level"
                  value={FilterLevel.Professional}
                  checked={typeLevel === FilterLevel.Professional}
                  onChange={handleFilterChange}
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
