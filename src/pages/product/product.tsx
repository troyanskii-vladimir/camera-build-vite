import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchProductDataAction, fetchProductReviewsAction, fetchSimilarProductsAction } from '../../store/api-action';
import Header from '../../componets/header/header';
import { AppRoute } from '../../config';
import SimilarList from '../../componets/similar-list/similar-list';
import ReviewsList from '../../componets/reviews-list/reviews-list';
import Footer from '../../componets/footer/footer';
import { Helmet } from 'react-helmet-async';
import Page404 from '../404/404';
import { Product } from '../../types/product';
import ModalAddItem from '../../componets/modal-add-item/modal-add-item';
import ReviewForm from '../../componets/review-form/review-form';
import ModalSuccessReview from '../../componets/modal-success-review/modal-success-review';


enum Tabs {
  Desc = 'desc',
  Char = 'char',
}

function ProductPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {id} = useParams();

  const product = useAppSelector((store) => store.productData);
  const similarProducts = useAppSelector((store) => store.similarProducts);
  const reviews = useAppSelector((store) => store.productReviews);
  const ratingArray = Array.from({ length: 5 }, (_e, i) => (i < product.rating) ? {class: 'full-', i} : {class: '', i});

  const [modalData, setModalData] = useState<Product | null>();
  const [modalReviewActive, setModalReviewActive] = useState<boolean>(false);
  const [modalSuccessReview, setModalSuccessReview] = useState<boolean>(false);

  useEffect(() => {
    const needToGetData = product.id !== Number(id) || Object.keys(product).length === 0;

    if (needToGetData && id) {
      dispatch(fetchProductDataAction(id));
      dispatch(fetchSimilarProductsAction(id));
      dispatch(fetchProductReviewsAction(id));
    }

  }, [dispatch, id, product]);

  const location = useLocation();
  const tabsType = location.search.slice(6, 10) as Tabs || Tabs.Char;
  const [currentTab, setCurrentTab] = useState<Tabs>(tabsType);

  const handleToTopButtonClick = (): void => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  const handleSuccessSend = (): void => {
    setModalReviewActive(false);
    setModalSuccessReview(true);
  };

  const handleAddButtonClick = (prod: Product): void => {
    document.body.classList.add('scroll-lock');
    setModalData(prod);
  };

  const handleCloseButtonClick = (): void => {
    document.body.classList.remove('scroll-lock');
    setModalData(null);
    setModalReviewActive(false);
    setModalSuccessReview(false);
  };

  const handleCreateReviewButtonClick = (): void => {
    document.body.classList.add('scroll-lock');
    setModalReviewActive(true);
  };

  if (Object.keys(product).length === 0 || !id) {
    return <Page404 />;
  }

  return (
    <div className="wrapper">
      <Helmet title={product.name} />
      <Header />
      <main>
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={AppRoute.Catalog}>
                    Главная
                    <svg width={5} height={8} aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini" />
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={AppRoute.Catalog}>
                    Каталог
                    <svg width={5} height={8} aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini" />
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <span className="breadcrumbs__link breadcrumbs__link--active">
                    {product.name}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="page-content__section">
            <section className="product">
              <div className="container">
                <div className="product__img">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={`${product.previewImgWebp}, ${product.previewImgWebp2x} 2x`}
                    />
                    <img
                      src={product.previewImg}
                      srcSet={`${product.previewImg2x} 2x`}
                      width={560}
                      height={480}
                      alt={product.name}
                    />
                  </picture>
                </div>
                <div className="product__content">
                  <h1 className="title title--h3">{product.name}</h1>
                  <div className="rate product__rate">
                    {
                      ratingArray.map((star) => (
                        <svg width={17} height={16} aria-hidden="true" key={star.i}>
                          <use xlinkHref={`#icon-${star.class}star`} />
                        </svg>
                      ))
                    }
                    <p className="visually-hidden">Рейтинг: {product.rating}</p>
                    <p className="rate__count">
                      <span className="visually-hidden">Всего оценок:</span>{reviews.length}
                    </p>
                  </div>
                  <p className="product__price">
                    <span className="visually-hidden">Цена:</span>{product.price.toLocaleString()} ₽
                  </p>
                  <button className="btn btn--purple" type="button" onClick={() => {
                    document.body.classList.add('scroll-lock');
                    setModalData(product);
                  }}
                  >
                    <svg width={24} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-add-basket" />
                    </svg>
                    Добавить в корзину
                  </button>
                  <div className="tabs product__tabs">
                    <div className="tabs__controls product__tabs-controls">
                      <button
                        className={`tabs__control ${currentTab === Tabs.Char ? 'is-active' : ''}`}
                        type="button"
                        onClick={(evt) => {
                          evt.preventDefault();
                          setCurrentTab(Tabs.Char);
                          navigate(`${AppRoute.Product}/${id}?tabs=${Tabs.Char}`);
                        }}
                      >
                        Характеристики
                      </button>
                      <button
                        className={`tabs__control ${currentTab === Tabs.Desc ? 'is-active' : ''}`}
                        type="button"
                        onClick={(evt) => {
                          evt.preventDefault();
                          setCurrentTab(Tabs.Desc);
                          navigate(`${AppRoute.Product}/${id}?tabs=${Tabs.Desc}`);
                        }}
                      >
                        Описание
                      </button>
                    </div>
                    <div className="tabs__content">
                      <div className={`tabs__element ${currentTab === Tabs.Char ? 'is-active' : ''}`}>
                        <ul className="product__tabs-list">
                          <li className="item-list">
                            <span className="item-list__title">Артикул:</span>
                            <p className="item-list__text"> {product.vendorCode}</p>
                          </li>
                          <li className="item-list">
                            <span className="item-list__title">Категория:</span>
                            <p className="item-list__text">{product.category}</p>
                          </li>
                          <li className="item-list">
                            <span className="item-list__title">Тип камеры:</span>
                            <p className="item-list__text">{product.type}</p>
                          </li>
                          <li className="item-list">
                            <span className="item-list__title">Уровень:</span>
                            <p className="item-list__text">{product.level}</p>
                          </li>
                        </ul>
                      </div>
                      <div className={`tabs__element ${currentTab === Tabs.Desc ? 'is-active' : ''}`}>
                        <div className="product__tabs-text">
                          <p>
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          {
            similarProducts &&
            <SimilarList products={similarProducts} onAddButtonClick={handleAddButtonClick} />
          }
          {
            reviews.length > 0 &&
            <ReviewsList reviews={reviews} onCreateReviewButtonClick={handleCreateReviewButtonClick} />
          }
        </div>
        {
          modalData &&
          <ModalAddItem product={modalData} onCloseButtonClick={handleCloseButtonClick} />
        }
        {
          modalReviewActive &&
          <ReviewForm productId={product.id} onCloseButtonClick={handleCloseButtonClick} onSuccessSend={handleSuccessSend} />
        }
        {
          modalSuccessReview &&
          <ModalSuccessReview onCloseButtonClick={handleCloseButtonClick} />
        }
      </main>
      <button className="up-btn" type="button" onClick={handleToTopButtonClick}>
        <svg width={12} height={18} aria-hidden="true">
          <use xlinkHref="#icon-arrow2" />
        </svg>
      </button>
      <Footer />
    </div>
  );
}

export default ProductPage;
