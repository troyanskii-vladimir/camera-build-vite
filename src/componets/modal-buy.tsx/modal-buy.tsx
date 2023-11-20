import FocusTrap from 'focus-trap-react';
import { MutableRefObject, useRef } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import browserHistory from '../../browser-history';
import { AppRoute } from '../../config';


type ModalBuyProps = {
  onCloseButtonClick: () => void;
}

function ModalBuy({onCloseButtonClick}: ModalBuyProps) {

  const handleCloseButtonClick = (): void => {
    onCloseButtonClick();
  };

  const handleReturnToByingButtonClick = (): void => {
    onCloseButtonClick();
    browserHistory.replace(AppRoute.Catalog);
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
      <div ref={ref2} className="modal is-active modal--narrow">
        <div className="modal__wrapper">
          <div className="modal__overlay" />
          <div ref={ref} className="modal__content">
            <p className="title title--h4">Спасибо за покупку</p>
            <svg className="modal__icon" width={80} height={78} aria-hidden="true">
              <use xlinkHref="#icon-review-success" />
            </svg>
            <div className="modal__buttons">
              <button
                className="btn btn--purple modal__btn modal__btn--fit-width"
                type="button"
                onClick={handleReturnToByingButtonClick}
              >
                Вернуться к покупкам
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

export default ModalBuy;
