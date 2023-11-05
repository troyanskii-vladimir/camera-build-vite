import CatalogCardsList from '../../componets/catalog-cards-list/catalog-cards-list';
import CatalogSidebar, { Filter } from '../../componets/catalog-sidebar/catalog-sidebar';
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


function MainPage(): JSX.Element {
  const products = useAppSelector(getProducts);
  const promoProducts = useAppSelector(getPromoProducts);
  const isProductsLoading = useAppSelector(getProductsLoadingStatus);


  const [searchParams] = useSearchParams();


  const page = searchParams.get('page') || '1';
  const orderBy = searchParams.get('orderBy') as SortType || SortType.Unsort;
  const orderDirection = searchParams.get('orderDirection') as SortOrder || SortOrder.Unsort;
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
  const [currentFilterProduct, setCurrentFilterProduct] = useState<FilterCamera>(typeProduct);
  const [currentFilterCamera, setCurrentFilterCamera] = useState<FilterType>(typeCamera);
  const [currentFilterLevel, setCurrentFilterLevel] = useState<FilterLevel>(typeLevel);


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

  //Для случая если пользователь жмет кнопку каталог, находясь на странице каталога (все должно сброситься)
  useEffect(() => {
    if (searchParams.toString().length < 1) {
      setSortedProducts(products);
      setCurrentProducts(sortedProducts);
      setCurrentPage(Number(page));
      setCurrentSortType(orderBy);
      setCurrentSortDirection(orderDirection);
      setCurrentFilterProduct(typeProduct);
      setCurrentFilterCamera(typeCamera);
      setCurrentFilterLevel(typeLevel);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    setFilteredProducts(products);

  }, [products]);

  useEffect(() => {
    setSortedProducts([...filterdProducts]);

    if (currentSortType === SortType.Price && currentSortDirection === SortOrder.ToTop) {
      setSortedProducts([...products].sort(sortPointsByPriceToTop));
    }

    if (currentSortType === SortType.Price && currentSortDirection === SortOrder.ToLow) {
      setSortedProducts([...products].sort(sortPointsByPriceToLow));
    }

    if (currentSortType === SortType.Rating && currentSortDirection === SortOrder.ToTop) {
      setSortedProducts([...products].sort(sortPointsByRatingToTop));
    }

    if (currentSortType === SortType.Rating && currentSortDirection === SortOrder.ToLow) {
      setSortedProducts([...products].sort(sortPointsByRatingToLow));
    }
  }, [currentSortDirection, currentSortType, filterdProducts, products]);

  useEffect(() => {
    const needToUpdatePage = currentPage !== Number(page) || sortedProducts[DISPLAYED_PRODUCTS * (currentPage - 1)];

    if (needToUpdatePage) {
      setCurrentProducts(sortedProducts.slice(DISPLAYED_PRODUCTS * (currentPage - 1), DISPLAYED_PRODUCTS * (currentPage - 1) + DISPLAYED_PRODUCTS));
    }

  }, [currentPage, page, sortedProducts, products, currentSortType]);


  const handleFilterSubmit = (filter: Filter) => {
    searchParams.delete('typeProduct');
    searchParams.delete('typeCamera');
    searchParams.delete('typeLevel');
    searchParams.append('typeProduct', filter.camera);
    searchParams.append('typeCamera', filter.type);
    searchParams.append('typeLevel', filter.level);
    setCurrentFilterProduct(filter.camera);
    setCurrentFilterCamera(filter.type);
    setCurrentFilterLevel(filter.level);
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
                  typeProduct={currentFilterProduct}
                  typeCamera={currentFilterCamera}
                  typeLevel={currentFilterLevel}
                  onFilterSubmit={handleFilterSubmit}
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
                      countOfPages={Math.ceil(products.length / DISPLAYED_PRODUCTS)}
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
