import { MutableRefObject, useRef } from 'react';
import { Product } from '../../types/product';
import { useDetectClickOutside } from 'react-detect-click-outside';
import FocusTrap from 'focus-trap-react';


type ModalAddItemProps = {
  product: Product;
  onCloseButtonClick: () => void;
}

function ModalAddItem({product, onCloseButtonClick}: ModalAddItemProps): JSX.Element {

  const handleCloseButtonClick = (): void => {
    onCloseButtonClick();
  };

  const ref: MutableRefObject<null> = useDetectClickOutside({
    onTriggered: handleCloseButtonClick,
    disableClick: false,
  });

  const ref2 = useRef<HTMLDivElement | null>(null);

  return (
    <FocusTrap focusTrapOptions={{
      fallbackFocus: '.modal',
    }}
    >
      <div ref={ref2} className="modal is-active">
        <div className="modal__wrapper">
          <div className="modal__overlay" />
          <div ref={ref} className="modal__content">
            <p className="title title--h4">Добавить товар в корзину</p>
            <div className="basket-item basket-item--short">
              <div className="basket-item__img">
                <picture>
                  <source
                    type="image/webp"
                    srcSet={`${product.previewImgWebp}, ${product.previewImgWebp2x} 2x`}
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
                  <li className="basket-item__list-item">{product.category}</li>
                  <li className="basket-item__list-item">{product.level} уровень</li>
                </ul>
                <p className="basket-item__price">
                  <span className="visually-hidden">Цена:</span>{product.price.toLocaleString()} ₽
                </p>
              </div>
            </div>
            <div className="modal__buttons">
              <button
                className="btn btn--purple modal__btn modal__btn--fit-width"
                type="button"
              >
                <svg width={24} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-add-basket" />
                </svg>
                Добавить в корзину
              </button>
            </div>
            <button
              className="cross-btn"
              type="button"
              aria-label="Закрыть попап"
              onClick={handleCloseButtonClick}
            >
              <svg width={10} height={10} aria-hidden="true">
                <use xlinkHref="#icon-close" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default ModalAddItem;
