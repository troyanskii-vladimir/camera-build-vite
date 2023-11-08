import { Link } from 'react-router-dom';
import { AppRoute } from '../../config';
import { useAppSelector } from '../../hooks';
import { getProductData, getProducts } from '../../store/product-data/selectors';
import { ChangeEvent, useEffect, useState } from 'react';
import { Product } from '../../types/product';
import FocusTrap from 'focus-trap-react';


type SearchHandler = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;


function Header(): JSX.Element {
  const products = useAppSelector(getProducts);
  const productId = useAppSelector(getProductData).id;

  const [resultProducts, setResultProducts] = useState<Product[] | null>(null);
  const [inpuValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue('');
    setResultProducts(null);
  }, [productId]);

  const isArrowUpPress = (evt: KeyboardEvent): boolean => {
    if (evt.key === 'ArrowUp') {
      evt.preventDefault();
      return true;
    }
    return false;
  };

  const isArrowDownPress = (evt: KeyboardEvent): boolean => {
    if (evt.key === 'ArrowDown') {
      evt.preventDefault();
      return true;
    }
    return false;
  };

  const onInputChange = ({ target }: SearchHandler) => {
    setInputValue(target.value);
    if (target.value === '') {
      setResultProducts(null);
      return;
    }
    const findedProducts = products.filter((product) => product.name.toLocaleLowerCase().includes(target.value.toLowerCase()));

    setResultProducts(findedProducts);
  };

  const onClearButtonClick = () => {
    setResultProducts(null);
    setInputValue('');
  };

  const isListVisible = resultProducts?.find((item) => item.name.length > 2) && inpuValue.length > 2 || false;

  return (
    <header className="header" id="header">
      <div className="container">
        <Link
          className="header__logo"
          to={AppRoute.Catalog}
          aria-label="Переход на главную"
        >
          <svg width={100} height={36} aria-hidden="true">
            <use xlinkHref="#icon-logo" />
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className="main-nav__link" to={AppRoute.Catalog}>
                Каталог
              </Link>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                Гарантии
              </a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                Доставка
              </a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                О компании
              </a>
            </li>
          </ul>
        </nav>
        <div className={`form-search ${isListVisible ? 'list-opened' : ''}`}>
          <form>
            <label>
              <svg
                className="form-search__icon"
                width={16}
                height={16}
                aria-hidden="true"
              >
                <use xlinkHref="#icon-lens" />
              </svg>
              <input
                className="form-search__input"
                type="text"
                autoComplete="off"
                placeholder="Поиск по сайту"
                onChange={onInputChange}
                value={inpuValue}
                data-testid="searchInputElement"
              />
            </label>
            <FocusTrap focusTrapOptions={{
              fallbackFocus: 'a',
              initialFocus: false,
              allowOutsideClick: true,
              preventScroll: false,
              isKeyBackward: isArrowUpPress,
              isKeyForward: isArrowDownPress,
            }}
            >
              <ul className='form-search__select-list'>
                {
                  resultProducts?.map((product) => (
                    <Link key={product.id} to={`${AppRoute.Product}/${product.id}`}>
                      <li className="form-search__select-item">
                        {product.name}
                      </li>
                    </Link>
                  ))
                }
              </ul>
            </FocusTrap>
          </form>
          <button className="form-search__reset" type="reset" onClick={onClearButtonClick}>
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg>
            <span className="visually-hidden">Сбросить поиск</span>
          </button>
        </div>
        <a className="header__basket-link" href="#">
          <svg width={16} height={16} aria-hidden="true">
            <use xlinkHref="#icon-basket" />
          </svg>
        </a>
      </div>
    </header>
  );
}

export default Header;
