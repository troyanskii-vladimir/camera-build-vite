import CatalogCardsList from '../../componets/catalog-cards-list/catalog-cards-list';
import CatalogSidebar, { Filter, FilterPrice } from '../../componets/catalog-sidebar/catalog-sidebar';
import CatalogSort from '../../componets/catalog-sort/catalog-sort';
import Footer from '../../componets/footer/footer';
import Header from '../../componets/header/header';
import Pagination from '../../componets/pagination/pagination';
import Slider from '../../componets/slider/slider';
import { useAppSelector } from '../../hooks';
import { useEffect, useState } from 'react';
import { Product } from '../../types/product';
import ModalAddItem from '../../componets/modal-add-item/modal-add-item';
import { DISPLAYED_PRODUCTS } from '../../config';
import { getProducts, getPromoProducts } from '../../store/product-data/selectors';
import { FilterCamera, FilterLevel, FilterType, SortOrder, SortType } from '../../types/sort';
import browserHistory from '../../browser-history';
import { useSearchParams } from 'react-router-dom';
import { sortPointsByPriceToLow, sortPointsByPriceToTop, sortPointsByRatingToLow, sortPointsByRatingToTop } from '../../utils/utils';


function MainPage(): JSX.Element {
  const products = useAppSelector(getProducts);
  const promoProducts = useAppSelector(getPromoProducts);


  const [searchParams] = useSearchParams();


  const page = searchParams.get('page') || '1';
  const orderBy = searchParams.get('orderBy') as SortType || SortType.Unsort;
  const orderDirection = searchParams.get('orderDirection') as SortOrder || SortOrder.Unsort;
  const typePrice = Number(searchParams.get('price')) || '';
  const typePriceUp = Number(searchParams.get('priceUp')) || 0;
  const typeProduct = searchParams.get('typeProduct') as FilterCamera || FilterCamera.Any;
  const typeCamera = searchParams.getAll('typeCamera') as FilterType[] || [];
  const typeLevel = searchParams.getAll('typeLevel') as FilterLevel[] || [];

  const [modalData, setModalData] = useState<Product | null>(null);

  const [filterdProducts, setFilteredProducts] = useState<Product[]>(products);
  const [sortedProducts, setSortedProducts] = useState<Product[]>(filterdProducts);
  const [currentProducts, setCurrentProducts] = useState<Product[]>(sortedProducts);
  const [currentPage, setCurrentPage] = useState(Number(page));
  const [currentSortType, setCurrentSortType] = useState<SortType>(orderBy);
  const [currentSortDirection, setCurrentSortDirection] = useState<SortOrder>(orderDirection);
  const [currentPrice, setCurrentPrice] = useState<number | ''>(typePrice);
  const [currentPriceUp, setCurrentPriceUp] = useState<number | ''>(typePriceUp);
  const [currentFilterProduct, setCurrentFilterProduct] = useState<FilterCamera>(typeProduct);
  const [currentFilterCamera, setCurrentFilterCamera] = useState<FilterType[]>(typeCamera);
  const [currentFilterLevel, setCurrentFilterLevel] = useState<FilterLevel[]>(typeLevel);

  const [minPriceBase, setMinPriceBase] = useState<number>(Number(typePrice));
  const [minPriceTemp, setMinPriceTemp] = useState<number>(minPriceBase);
  const [maxPriceBase, setMaxPriceBase] = useState<number>(typePriceUp);
  const [maxPriceTemp, setMaxPriceTemp] = useState<number>(maxPriceBase);


  //Для случая если пользователь жмет кнопку 'каталог', находясь на странице каталога (все должно сброситься)
  useEffect(() => {
    if (searchParams.toString().length < 1) {
      setFilteredProducts(products);
      setSortedProducts(filterdProducts);
      setCurrentProducts(sortedProducts);
      setCurrentPage(Number(page));
      setCurrentSortType(orderBy);
      setCurrentSortDirection(orderDirection);
      setCurrentPrice(typePrice);
      setCurrentPriceUp(typePriceUp);
      setCurrentFilterProduct(typeProduct);
      setCurrentFilterCamera(typeCamera);
      setCurrentFilterLevel(typeLevel);

      setMinPriceTemp(minPriceBase);
      setMaxPriceTemp(maxPriceBase);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);


  useEffect(() => {
    if (products.length > 0) {
      setMinPriceBase([...products].sort(sortPointsByPriceToTop)[0].price);
      setMaxPriceBase([...products].sort(sortPointsByPriceToLow)[0].price);
    }

    if (filterdProducts.length > 0) {
      setMinPriceTemp([...filterdProducts].sort(sortPointsByPriceToTop)[0].price);
      setMaxPriceTemp([...filterdProducts].sort(sortPointsByPriceToLow)[0].price);
    }
  }, [products, filterdProducts]);


  useEffect(() => {
    if (!searchParams.has('price')) {
      setCurrentPrice('');
    }

    if (!searchParams.has('priceUp')) {
      setCurrentPriceUp('');
    }
  }, [minPriceTemp, maxPriceTemp, searchParams]);


  useEffect(() => {
    let tempProducts: Product[] = [...products];

    if (searchParams.has('price') && currentPrice !== '') {
      tempProducts = [...tempProducts].filter((product) => product.price >= currentPrice);
    }

    if (searchParams.has('priceUp') && currentPriceUp !== '') {
      tempProducts = [...tempProducts].filter((product) => product.price <= currentPriceUp);
    }

    if (currentFilterProduct === FilterCamera.Photo) {
      tempProducts = [...tempProducts].filter((product) => product.category === 'Фотоаппарат');
    }

    if (currentFilterProduct === FilterCamera.Video) {
      tempProducts = [...tempProducts].filter((product) => product.category === 'Видеокамера');
    }

    if (currentFilterCamera.length > 0) {
      const digital = (currentFilterCamera.includes(FilterType.Digital)) ? 'Цифровая' : '';
      const film = (currentFilterCamera.includes(FilterType.Film)) ? 'Плёночная' : '';
      const snapshot = (currentFilterCamera.includes(FilterType.Snapshot)) ? 'Моментальная' : '';
      const collection = (currentFilterCamera.includes(FilterType.Collection)) ? 'Коллекционная' : '';
      tempProducts = [...tempProducts].filter((product) => product.type === digital || product.type === film || product.type === snapshot || product.type === collection);
    }

    if (currentFilterLevel.length > 0) {
      const nullable = (currentFilterLevel.includes(FilterLevel.Nullable)) ? 'Нулевой' : '';
      const amateur = (currentFilterLevel.includes(FilterLevel.Amateur)) ? 'Любительский' : '';
      const professional = (currentFilterLevel.includes(FilterLevel.Professional)) ? 'Профессиональный' : '';
      tempProducts = [...tempProducts].filter((product) => product.level === nullable || product.level === amateur || product.level === professional);
    }

    setFilteredProducts(tempProducts);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFilterCamera, currentFilterLevel, currentFilterProduct, currentPrice, currentPriceUp, products]);


  useEffect(() => {
    setSortedProducts([...filterdProducts]);

    if (currentSortType === SortType.Price && currentSortDirection === SortOrder.ToTop) {
      setSortedProducts([...filterdProducts].sort(sortPointsByPriceToTop));
    }

    if (currentSortType === SortType.Price && currentSortDirection === SortOrder.ToLow) {
      setSortedProducts([...filterdProducts].sort(sortPointsByPriceToLow));
    }

    if (currentSortType === SortType.Rating && currentSortDirection === SortOrder.ToTop) {
      setSortedProducts([...filterdProducts].sort(sortPointsByRatingToTop));
    }

    if (currentSortType === SortType.Rating && currentSortDirection === SortOrder.ToLow) {
      setSortedProducts([...filterdProducts].sort(sortPointsByRatingToLow));
    }
  }, [currentSortDirection, currentSortType, filterdProducts]);


  useEffect(() => {
    setCurrentProducts(sortedProducts.slice(DISPLAYED_PRODUCTS * (currentPage - 1), DISPLAYED_PRODUCTS * (currentPage - 1) + DISPLAYED_PRODUCTS));

  }, [currentPage, page, sortedProducts, currentSortType]);


  const setCorrectPriceMin = (priceMin: number) => {
    if (priceMin < 0) {
      searchParams.delete('price');
      searchParams.append('price', String(minPriceBase));
      setCurrentPrice(minPriceBase);
    }

    if (priceMin < minPriceTemp) {
      searchParams.delete('price');
      searchParams.append('price', String(minPriceTemp));
      setCurrentPrice(minPriceTemp);
    }

    if (Number(currentPriceUp) > 0 && priceMin > Number(currentPriceUp)) {
      searchParams.delete('price');
      searchParams.append('price', String(currentPriceUp));
      setCurrentPrice(currentPriceUp);
    }

    browserHistory.replace(`?${searchParams.toString()}`);
  };

  const setCorrectPriceMax = (priceMax: number) => {
    if (priceMax < minPriceTemp) {
      searchParams.delete('priceUp');
      searchParams.append('priceUp', String(minPriceTemp));
      setCurrentPriceUp(minPriceTemp);
    }

    if (priceMax < Number(currentPrice)) {
      searchParams.delete('priceUp');
      searchParams.append('priceUp', String(currentPrice));
      setCurrentPriceUp(Number(currentPrice));
    }

    if (priceMax > maxPriceBase) {
      searchParams.delete('priceUp');
      searchParams.append('priceUp', String(maxPriceBase));
      setCurrentPriceUp(maxPriceBase);
    }

    browserHistory.replace(`?${searchParams.toString()}`);
  };

  const handleFilterPriceChange = (filterPrice: FilterPrice) => {
    if (filterPrice.price !== currentPrice) {
      searchParams.delete('price');
      searchParams.append('price', String(filterPrice.price));
      setCurrentPrice(filterPrice.price);
    }

    if (filterPrice.priceUp !== currentPriceUp) {
      searchParams.delete('priceUp');
      searchParams.append('priceUp', String(filterPrice.priceUp));
      setCurrentPriceUp(filterPrice.priceUp);
    }

    searchParams.delete('page');
    setCurrentPage(1);

    browserHistory.replace(`?${searchParams.toString()}`);
  };

  const handleFilterChange = (filter: Filter) => {
    if (filter.camera !== FilterCamera.Any) {
      searchParams.delete('typeProduct');
      searchParams.append('typeProduct', filter.camera);
      setCurrentFilterProduct(filter.camera);
    } else {
      searchParams.delete('typeProduct');
      setCurrentFilterProduct(FilterCamera.Any);
    }

    if (filter.type) {
      searchParams.delete('typeCamera');
      filter.type.forEach((type) => searchParams.append('typeCamera', type));
      setCurrentFilterCamera(filter.type);
    } else {
      searchParams.delete('typeCamera');
      setCurrentFilterCamera([]);
    }

    if (filter.level) {
      searchParams.delete('typeLevel');
      filter.level.forEach((level) => searchParams.append('typeLevel', level));
      setCurrentFilterLevel(filter.level);
    } else {
      searchParams.delete('typeLevel');
      setCurrentFilterLevel([]);
    }


    searchParams.delete('page');
    setCurrentPage(1);

    browserHistory.replace(`?${searchParams.toString()}`);
  };

  const handleFilterRefresh = () => {
    searchParams.delete('page');
    searchParams.delete('price');
    searchParams.delete('priceUp');
    searchParams.delete('typeProduct');
    searchParams.delete('typeCamera');
    searchParams.delete('typeLevel');
    setCurrentPage(1);
    setCurrentPrice(minPriceBase);
    setCurrentPriceUp(maxPriceBase);
    setMinPriceTemp(minPriceBase);
    setMaxPriceTemp(maxPriceBase);
    setCurrentFilterProduct(FilterCamera.Any);
    setCurrentFilterCamera([]);
    setCurrentFilterLevel([]);
    browserHistory.replace(`?${searchParams.toString()}`);
  };

  const handleChangeSortTypeClick = (sortType: SortType): void => {
    searchParams.delete('orderBy');
    searchParams.append('orderBy', sortType);
    setCurrentSortType(sortType);
    if (currentSortDirection === SortOrder.Unsort) {
      setCurrentSortDirection(SortOrder.ToTop);
      searchParams.append('orderDirection', SortOrder.ToTop);
    }
    browserHistory.replace(`?${searchParams.toString()}`);
  };

  const handleChangeSortOrderClick = (sortOrder: SortOrder): void => {
    searchParams.delete('orderDirection');
    searchParams.append('orderDirection', sortOrder);
    setCurrentSortDirection(sortOrder);
    if (currentSortType === SortType.Unsort) {
      setCurrentSortType(SortType.Price);
      searchParams.append('orderBy', SortType.Price);
    }
    browserHistory.replace(`?${searchParams.toString()}`);
  };

  const handleNumberButtonClick = (num: number): void => {
    setCurrentProducts([]);
    setCurrentPage(num);
  };

  const handleAddButtonClick = (product: Product): void => {
    document.body.classList.add('scroll-lock');
    setModalData(product);
  };

  const handleCloseButtonClick = (): void => {
    document.body.classList.remove('scroll-lock');
    setModalData(null);
  };

  return (
    <div className="wrapper">
      <Header />
      <main>
        <Slider products={promoProducts} />
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link" href="index.html">
                    Главная
                    <svg width={5} height={8} aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini" />
                    </svg>
                  </a>
                </li>
                <li className="breadcrumbs__item">
                  <span className="breadcrumbs__link breadcrumbs__link--active">
                    Каталог
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <CatalogSidebar
                  typePrice={currentPrice}
                  typePriceUp={currentPriceUp}
                  typeProduct={currentFilterProduct}
                  typeCamera={currentFilterCamera}
                  typeLevel={currentFilterLevel}
                  minPriceTemp={minPriceTemp}
                  maxPriceTemp={maxPriceTemp}
                  onFilterPriceSubmit={handleFilterPriceChange}
                  onFilterSubmit={handleFilterChange}
                  onFilterRefresh={handleFilterRefresh}
                  setCorrectPriceMin={setCorrectPriceMin}
                  setCorrectPriceMax={setCorrectPriceMax}
                />
                <div className="catalog__content">
                  <CatalogSort
                    orderBy={currentSortType}
                    orderDirection={currentSortDirection}
                    onChangeSortTypeCLick={handleChangeSortTypeClick}
                    onChangeSortOrderCLick={handleChangeSortOrderClick}
                  />
                  <CatalogCardsList products={currentProducts} onAddButtonClick={handleAddButtonClick} />
                  {
                    Math.ceil(products.length / DISPLAYED_PRODUCTS) > 1 &&
                    <Pagination
                      currentPage={currentPage}
                      countOfPages={Math.ceil(filterdProducts.length / DISPLAYED_PRODUCTS)}
                      onNumberButtonClick={handleNumberButtonClick}
                    />
                  }
                </div>
              </div>
            </div>
          </section>
        </div>
        {
          modalData &&
          <ModalAddItem product={modalData} onCloseButtonClick={handleCloseButtonClick} />
        }
      </main>
      <Footer />
    </div>
  );
}

export default MainPage;
