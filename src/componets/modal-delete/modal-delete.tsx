import FocusTrap from 'focus-trap-react';
import { MutableRefObject, useRef } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { ProductCart } from '../../types/cart';
import { useAppDispatch } from '../../hooks';
import { deleteProduct } from '../../store/cart-data/actions';


type ModalDeleteProps = {
  product: ProductCart;
  onCloseButtonClick: () => void;
}

function ModalDelete({product, onCloseButtonClick}: ModalDeleteProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleCloseButtonClick = () => {
    onCloseButtonClick();
  };

  const handleSubmitDeleteButtonClick = () => {
    dispatch(deleteProduct(product));
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
            <p className="title title--h4">Удалить этот товар?</p>
            <div className="basket-item basket-item--short">
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
                  <li className="basket-item__list-item">{`${product.type} ${product.category === 'Фотоаппарат' ? 'фото' : 'видео'}камера`}</li>
                  <li className="basket-item__list-item">{`${product.level} уровень`}</li>
                </ul>
              </div>
            </div>
            <div className="modal__buttons">
              <button
                className="btn btn--purple modal__btn modal__btn--half-width"
                type="button"
                onClick={handleSubmitDeleteButtonClick}
              >
                Удалить
              </button>
              <button
                className="btn btn--transparent modal__btn modal__btn--half-width"
                onClick={handleCloseButtonClick}
              >
                Продолжить покупки
              </button>
            </div>
            <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={handleCloseButtonClick}>
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

export default ModalDelete;
