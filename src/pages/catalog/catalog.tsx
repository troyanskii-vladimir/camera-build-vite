import Banner from '../../componets/banner/banner';
import CatalogCardsList from '../../componets/catalog-cards-list/catalog-cards-list';
import CatalogSidebar from '../../componets/catalog-sidebar/catalog-sidebar';
import CatalogSort from '../../componets/catalog-sort/catalog-sort';
import Footer from '../../componets/footer/footer';
import Header from '../../componets/header/header';
import { useAppSelector } from '../../hooks';


function MainPage(): JSX.Element {
  const products = useAppSelector((store) => store.products);


  return (
    <div className="wrapper">
      <Header />
      <main>
        <Banner />
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
                  <CatalogCardsList products={products} />
                  <div className="pagination">
                    <ul className="pagination__list">
                      <li className="pagination__item">
                        <a
                          className="pagination__link pagination__link--active"
                          href={1}
                        >
                          1
                        </a>
                      </li>
                      <li className="pagination__item">
                        <a className="pagination__link" href={2}>
                          2
                        </a>
                      </li>
                      <li className="pagination__item">
                        <a className="pagination__link" href={3}>
                          3
                        </a>
                      </li>
                      <li className="pagination__item">
                        <a
                          className="pagination__link pagination__link--text"
                          href={2}
                        >
                          Далее
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default MainPage;
