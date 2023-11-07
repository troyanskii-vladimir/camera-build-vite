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
import { getProducts, getProductsLoadingStatus, getPromoProducts } from '../../store/product-data/selectors';
import { FilterCamera, FilterLevel, FilterType, SortOrder, SortType } from '../../types/sort';
import browserHistory from '../../browser-history';
import { useSearchParams } from 'react-router-dom';


function sortPointsByRatingToTop (a: Product, b: Product): number {
  return a.rating > b.rating ? 1 : -1;
}

function sortPointsByRatingToLow (a: Product, b: Product): number {
  return a.rating < b.rating ? 1 : -1;
}

function sortPointsByPriceToTop (a: Product, b: Product): number {
  return a.price > b.price ? 1 : -1;
}

function sortPointsByPriceToLow (a: Product, b: Product): number {
  return a.price < b.price ? 1 : -1;
}


function MainPage(): JSX.Element {
  const products = useAppSelector(getProducts);
  const promoProducts = useAppSelector(getPromoProducts);
  const isProductsLoading = useAppSelector(getProductsLoadingStatus);

  // const minPrice = [...products].sort(sortPointsByPriceToTop)[0]?.price;
  // const maxPrice = [...products].sort(sortPointsByPriceToLow)[0]?.price;

  const [searchParams] = useSearchParams();


  const page = searchParams.get('page') || '1';
  const orderBy = searchParams.get('orderBy') as SortType || SortType.Unsort;
  const orderDirection = searchParams.get('orderDirection') as SortOrder || SortOrder.Unsort;
  const typePrice = Number(searchParams.get('price')) || 5;
  const typePriceUp = Number(searchParams.get('priceUp')) || 490500;
  const typeProduct = searchParams.get('typeProduct') as FilterCamera || FilterCamera.Any;
  const typeCamera = searchParams.get('typeCamera') as FilterType || FilterType.Any;
  const typeLevel = searchParams.get('typeLevel') as FilterLevel || FilterType.Any;

  const [modalData, setModalData] = useState<Product | null>(null);

  const [filterdProducts, setFilteredProducts] = useState<Product[]>(products);
  const [sortedProducts, setSortedProducts] = useState<Product[]>(filterdProducts);
  const [currentProducts, setCurrentProducts] = useState<Product[]>(sortedProducts);
  const [currentPage, setCurrentPage] = useState(Number(page));
  const [currentSortType, setCurrentSortType] = useState<SortType>(orderBy);
  const [currentSortDirection, setCurrentSortDirection] = useState<SortOrder>(orderDirection);
  const [currentPrice, setCurrentPrice] = useState<number>(typePrice);
  const [currentPriceUp, setCurrentPriceUp] = useState<number>(typePriceUp);
  const [currentFilterProduct, setCurrentFilterProduct] = useState<FilterCamera>(typeProduct);
  const [currentFilterCamera, setCurrentFilterCamera] = useState<FilterType>(typeCamera);
  const [currentFilterLevel, setCurrentFilterLevel] = useState<FilterLevel>(typeLevel);

  const [minPriceBase, setMinPriceBase] = useState<number>(typePrice);
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
      setCurrentPrice(minPriceTemp);
    }

    if (!searchParams.has('priceUp')) {
      setCurrentPriceUp(maxPriceTemp);
    }
  // }, [currentFilterProduct, minPriceTemp, maxPriceTemp, searchParams]);
  }, [minPriceTemp, maxPriceTemp, searchParams]);


  useEffect(() => {
    let tempProducts: Product[] = [...products];

    if (searchParams.has('price')) {
      tempProducts = [...tempProducts].filter((product) => product.price >= currentPrice);
    }

    if (searchParams.has('priceUp')) {
      tempProducts = [...tempProducts].filter((product) => product.price <= currentPriceUp);
    }

    if (currentFilterProduct === FilterCamera.Photo) {
      tempProducts = [...tempProducts].filter((product) => product.category === 'Фотоаппарат');
    }

    if (currentFilterProduct === FilterCamera.Video) {
      tempProducts = [...tempProducts].filter((product) => product.category === 'Видеокамера');
    }

    if (currentFilterCamera === FilterType.Digital) {
      tempProducts = [...tempProducts].filter((product) => product.type === 'Цифровая');
    }

    if (currentFilterCamera === FilterType.Film) {
      tempProducts = [...tempProducts].filter((product) => product.type === 'Коллекционная');
    }

    if (currentFilterCamera === FilterType.Snapshot) {
      tempProducts = [...tempProducts].filter((product) => product.type === 'Моментальная');
    }

    if (currentFilterCamera === FilterType.Collection) {
      tempProducts = [...tempProducts].filter((product) => product.type === 'Плёночная');
    }

    if (currentFilterLevel === FilterLevel.Nullable) {
      tempProducts = [...tempProducts].filter((product) => product.level === 'Нулевой');
    }

    if (currentFilterLevel === FilterLevel.Amateur) {
      tempProducts = [...tempProducts].filter((product) => product.level === 'Любительский');
    }

    if (currentFilterLevel === FilterLevel.Professional) {
      tempProducts = [...tempProducts].filter((product) => product.level === 'Профессиональный');
    }

    setFilteredProducts(tempProducts);

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
    // if (sortedProducts.length === 0) {
    //   searchParams.delete('page');
    //   setCurrentPage(1);
    //   browserHistory.replace(`?${searchParams.toString()}`);
    // }
    setCurrentProducts(sortedProducts.slice(DISPLAYED_PRODUCTS * (currentPage - 1), DISPLAYED_PRODUCTS * (currentPage - 1) + DISPLAYED_PRODUCTS));

  }, [currentPage, page, sortedProducts, currentSortType]);


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

    browserHistory.replace(`?${searchParams.toString()}`);
  }

  const handleFilterChange = (filter: Filter) => {
    if (filter.camera !== FilterCamera.Any) {
      searchParams.delete('typeProduct');
      searchParams.append('typeProduct', filter.camera);
      setCurrentFilterProduct(filter.camera);
    }

    if (filter.type !== FilterType.Any) {
      searchParams.delete('typeCamera');
      searchParams.append('typeCamera', filter.type);
      setCurrentFilterCamera(filter.type);
    }

    if (filter.level !== FilterLevel.Any) {
      searchParams.delete('typeLevel');
      searchParams.append('typeLevel', filter.level);
      setCurrentFilterLevel(filter.level);
    }

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
                  minPrice={minPriceBase}
                  maxPrice={maxPriceBase}
                  typePrice={currentPrice}
                  typePriceUp={currentPriceUp}
                  typeProduct={currentFilterProduct}
                  typeCamera={currentFilterCamera}
                  typeLevel={currentFilterLevel}
                  onFilterPriceSubmit={handleFilterPriceChange}
                  onFilterSubmit={handleFilterChange}
                />
                <div className="catalog__content">
                  <CatalogSort
                    orderBy={currentSortType}
                    orderDirection={currentSortDirection}
                    onChangeSortTypeCLick={handleChangeSortTypeClick}
                    onChangeSortOrderCLick={handleChangeSortOrderClick}
                  />
                  {
                    !isProductsLoading &&
                    <CatalogCardsList products={currentProducts} onAddButtonClick={handleAddButtonClick} />
                  }
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
