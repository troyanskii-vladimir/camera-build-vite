import { useState } from 'react';
import { MAX_COUNT_OF_PRODUCT_IN_BASKET, MIN_COUNT_OF_PRODUCT_IN_BASKET } from '../../config';
import { useAppDispatch } from '../../hooks';
import { changeProduct } from '../../store/cart-data/actions';
import { ProductCart } from '../../types/cart';


type BasketItemProps = {
  product: ProductCart;
  onDeleteButtonClick: (prod: ProductCart) => void;
}


function BasketItem({product, onDeleteButtonClick}: BasketItemProps):JSX.Element {
  const dispatch = useAppDispatch();

  const [productCount, setProductCount] = useState<number>(product.count);

  const handleDeleteCountButtonClick = () => {
    if (product.count <= MIN_COUNT_OF_PRODUCT_IN_BASKET) {
      return;
    }
    setProductCount(productCount - 1);
    dispatch(changeProduct({
      ...product,
      count: product.count - 1,
    }));
  };

  const handleAddCountButtonClick = () => {
    if (product.count >= MAX_COUNT_OF_PRODUCT_IN_BASKET) {
      return;
    }
    setProductCount(productCount + 1);
    dispatch(changeProduct({
      ...product,
      count: product.count + 1,
    }));
  };


  return (
    <>
      <div className="basket-item__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`${product.previewImg}, ${product.previewImgWebp2x} 2x`}
          />
          <img
            src={product.previewImg}
            srcSet={`${product.previewImg2x} 2x`}
            width={140}
            height={120}
            alt={product.name}
          />
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{product.name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item">
            <span className="basket-item__article">Артикул:</span>{' '}
            <span className="basket-item__number">{product.vendorCode}</span>
          </li>
          <li className="basket-item__list-item">
            {`${product.type} ${product.category === 'Фотоаппарат' ? 'фото' : 'видео'}камера`}
          </li>
          <li className="basket-item__list-item">
            {`${product.level} уровень`}
          </li>
        </ul>
      </div>
      <p className="basket-item__price">
        <span className="visually-hidden">Цена:</span>{product.price.toLocaleString()} ₽
      </p>
      <div className="quantity">
        <button
          className="btn-icon btn-icon--prev"
          aria-label="уменьшить количество товара"
          onClick={handleDeleteCountButtonClick}
        >
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1"/>
        <input
          type="number"
          id="counter1"
          value={(productCount === 0) ? '' : String(productCount)}
          min={MIN_COUNT_OF_PRODUCT_IN_BASKET}
          max={MAX_COUNT_OF_PRODUCT_IN_BASKET}
          step="1"
          aria-label="количество товара"
          onBlur={() => setProductCount(product.count)}
          onChange={(evt) => {
            if (Number(evt.target.value) > MAX_COUNT_OF_PRODUCT_IN_BASKET) {
              return;
            }

            if (!Number.isInteger(Number(evt.target.value))) {
              return;
            }

            if (Number(evt.target.value) < 0) {
              return;
            }

            setProductCount(Number(evt.target.value));

            if (Number(evt.target.value) < MIN_COUNT_OF_PRODUCT_IN_BASKET) {
              dispatch(changeProduct({
                ...product,
                count: MIN_COUNT_OF_PRODUCT_IN_BASKET,
              }));
            }

            if (Number(evt.target.value) >= MIN_COUNT_OF_PRODUCT_IN_BASKET) {
              dispatch(changeProduct({
                ...product,
                count: Number(evt.target.value),
              }));
            }
          }}
        />
        <button
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
          onClick={handleAddCountButtonClick}
        >
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price">
        <span className="visually-hidden">Общая цена:</span>{(product.price * product.count).toLocaleString()} ₽
      </div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Удалить товар"
        onClick={(evt) => {
          evt.preventDefault();
          evt.stopPropagation();
          onDeleteButtonClick(product);
        }}
      >
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
      </button>
    </>
  );
}

export default BasketItem;
