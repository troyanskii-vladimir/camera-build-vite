import { Link } from 'react-router-dom';
import Footer from '../../componets/footer/footer';
import Header from '../../componets/header/header';
import { AppRoute } from '../../config';
import BasketList from '../../componets/basket-list/basket-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getDiscount, getLastCorrectCoupon, getProductsCart } from '../../store/cart-data/selectors';
import { ChangeEvent, FormEvent, useState } from 'react';
import { checkCouponValueAction, postNewOrderAction } from '../../store/api-action';
import ModalBuy from '../../componets/modal-buy.tsx/modal-buy';
import { cleanCart } from '../../store/cart-data/actions';


type InputHandler = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

function BasketPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const [coupon, setCoupon] = useState<string>('');
  const [promoColor, setPromoColor] = useState<string>('');
  const [modalSuccess, setModalSuccess] = useState<boolean>(false);

  const promoLabelClassName = `custom-input ${promoColor === 'Green' ? 'is-valid' : ''}${promoColor === 'Red' ? 'is-invalid' : ''}`;


  const products = useAppSelector(getProductsCart);
  const discount = useAppSelector(getDiscount);
  const lastRightCoupon = useAppSelector(getLastCorrectCoupon);
  const productsPrice = products.reduce((total, currentValue) => total + (currentValue.price * currentValue.count), 0);
  const discountPrice = Math.floor(productsPrice * discount / 100);
  const totalPrice = productsPrice - discountPrice;


  const handleCouponSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(checkCouponValueAction({
      coupon,
      onSuccess: () => {
        setPromoColor('Green');
      },
      onFail: () => {
        setPromoColor('Red');
      },
    }));
  };

  const handleCouponChange = ({ target }: InputHandler) => {
    setCoupon(target.value);
    if (target.value.includes(' ')) {
      setCoupon(target.value.replace(' ', ''));
    }
  };

  const handleBuyButtonClick = () => {
    dispatch(postNewOrderAction({
      camerasIds: products.map((product) => product.id),
      coupon: lastRightCoupon,
      onSuccess: () => {
        document.body.classList.add('scroll-lock');
        dispatch(cleanCart());
        setModalSuccess(true);
        setPromoColor('');
        setCoupon('');
      },
    }));
  };

  const handleCloseButtonClick = () => {
    document.body.classList.remove('scroll-lock');
    setModalSuccess(false);
  };

  return (
    <div className="wrapper">
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
                    Корзина
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <section className="basket">
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>
              <BasketList products={products} />
              <div className="basket__summary">
                <div className="basket__promo">
                  <p className="title title--h4">
                    Если у вас есть промокод на скидку, примените его в этом поле
                  </p>
                  <div className="basket-form">
                    <form action="#" onSubmit={handleCouponSubmit}>
                      <div className={promoLabelClassName}>
                        <label>
                          <span className="custom-input__label">Промокод</span>
                          <input
                            type="text"
                            name="promo"
                            placeholder="Введите промокод"
                            value={coupon}
                            onChange={handleCouponChange}
                          />
                        </label>
                        <p className="custom-input__error">Промокод неверный</p>
                        <p className="custom-input__success">Промокод принят!</p>
                      </div>
                      <button className="btn" type="submit">
                        Применить
                      </button>
                    </form>
                  </div>
                </div>
                <div className="basket__summary-order">
                  <p className="basket__summary-item">
                    <span className="basket__summary-text">Всего:</span>
                    <span className="basket__summary-value">{productsPrice.toLocaleString()} ₽</span>
                  </p>
                  <p className="basket__summary-item">
                    <span className="basket__summary-text">Скидка:</span>
                    <span className="basket__summary-value basket__summary-value--bonus">
                      {discountPrice.toLocaleString()} ₽
                    </span>
                  </p>
                  <p className="basket__summary-item">
                    <span className="basket__summary-text basket__summary-text--total">
                      К оплате:
                    </span>
                    <span className="basket__summary-value basket__summary-value--total">
                      {totalPrice.toLocaleString()} ₽
                    </span>
                  </p>
                  <button
                    className="btn btn--purple"
                    type="submit"
                    disabled={products.length === 0}
                    onClick={handleBuyButtonClick}
                  >
                    Оформить заказ
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      {
        modalSuccess &&
        <ModalBuy onCloseButtonClick={handleCloseButtonClick} />
      }
      <Footer />
    </div>
  );
}

export default BasketPage;
