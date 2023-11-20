import FocusTrap from 'focus-trap-react';
import { MutableRefObject, useRef } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import browserHistory from '../../browser-history';
import { AppRoute } from '../../config';


type ModalSuccessAddProps = {
  onCloseButtonClick: () => void;
  layout: 'catalog' | 'product';
}

function ModalSuccessAdd({onCloseButtonClick, layout}: ModalSuccessAddProps): JSX.Element {
  const handleSuccessAddCloseButtonClick = (): void => {
    onCloseButtonClick();
  };

  const handleReturnToByingButtonClick = (): void => {
    onCloseButtonClick();
    if (layout === 'product') {
      browserHistory.replace(AppRoute.Catalog);
    }
  };

  const ref: MutableRefObject<null> = useDetectClickOutside({
    onTriggered: handleSuccessAddCloseButtonClick,
    disableClick: false,
  });

  const ref2 = useRef<HTMLDivElement | null>(null);

  return (
    <FocusTrap focusTrapOptions={{
      fallbackFocus: '.modal',
    }}
    >
      <div ref={ref2} className="modal is-active modal--narrow">
        <div className="modal__wrapper">
          <div className="modal__overlay" />
          <div ref={ref} className="modal__content">
            <p className="title title--h4">Товар успешно добавлен в корзину</p>
            <svg className="modal__icon" width={86} height={80} aria-hidden="true">
              <use xlinkHref="#icon-success" />
            </svg>
            <div className="modal__buttons">
              <button className="btn btn--transparent modal__btn" onClick={handleReturnToByingButtonClick}>
                Продолжить покупки
              </button>
              <button
                className="btn btn--purple modal__btn modal__btn--fit-width"
                onClick={() => {
                  onCloseButtonClick();
                  browserHistory.replace(AppRoute.Cart);
                }}
              >
                Перейти в корзину
              </button>
            </div>
            <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={handleSuccessAddCloseButtonClick}>
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

export default ModalSuccessAdd;
