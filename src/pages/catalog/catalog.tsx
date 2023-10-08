import { useLocation } from 'react-router-dom';
import CatalogCardsList from '../../componets/catalog-cards-list/catalog-cards-list';
import CatalogSidebar from '../../componets/catalog-sidebar/catalog-sidebar';
import CatalogSort from '../../componets/catalog-sort/catalog-sort';
import Footer from '../../componets/footer/footer';
import Header from '../../componets/header/header';
import Pagination from '../../componets/pagination/pagination';
import Slider from '../../componets/slider/slider';
import { useAppSelector } from '../../hooks';
import { useEffect, useState } from 'react';
import { Product } from '../../types/product';
import ModalAddItem from '../../componets/modal-add-item/modal-add-item';

const DISPLAYED_PRODUCTS = 9;


function MainPage(): JSX.Element {
  const products = useAppSelector((store) => store.products);
  const promoProducts = useAppSelector((store) => store.promoProducts);
  const isProductsLoading = useAppSelector((store) => store.isProductsLoading);

  const location = useLocation();
  const page = location.search.at(-1) || '1';

  const [modalData, setModalData] = useState<Product | null>(null);

  const [currentProducts, setCurrentProducts] = useState<Product[]>(products);
  const [currentPage, setCurrentPage] = useState(Number(page));

  useEffect(() => {
    const needToUpdate = currentPage !== Number(page) || products[DISPLAYED_PRODUCTS * (currentPage - 1)];

    if (needToUpdate) {
      setCurrentProducts(products.slice(DISPLAYED_PRODUCTS * (currentPage - 1), DISPLAYED_PRODUCTS * (currentPage - 1) + DISPLAYED_PRODUCTS));
    }

  }, [currentPage, page, products]);

  const handleNumberButtonClick = (num: number): void => {
    setCurrentProducts([]);
    setCurrentPage(num);
  };

  const handleAddButtonClick = (product: Product): void => {
    setModalData(product);
  };

  const handleCloseButtonClick = (): void => {
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
                <CatalogSidebar />
                <div className="catalog__content">
                  <CatalogSort />
                  {
                    !isProductsLoading && <CatalogCardsList products={currentProducts} onAddButtonClick={handleAddButtonClick}/>
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
