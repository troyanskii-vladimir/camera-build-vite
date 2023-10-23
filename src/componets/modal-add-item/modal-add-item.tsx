import { Product } from '../../types/product';
// import onClickOutside from 'react-onclickoutside';
import { useDetectClickOutside } from 'react-detect-click-outside';
import ModalAddItemContent from './modal-add-item-content';


type ModalAddItemProps = {
  product: Product;
  onCloseButtonClick: () => void;
}

function ModalAddItem({product, onCloseButtonClick}: ModalAddItemProps): JSX.Element {
  const handleCloseButtonClick = (): void => {
    onCloseButtonClick();
  };

  const handleClick = (): void => {
    console.log('test');
  };

  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay" />
        <ModalAddItemContent product={product} onCloseButtonClick={onCloseButtonClick} onClick={handleClick} />
      </div>
    </div>
  );
}

export default ModalAddItem;
