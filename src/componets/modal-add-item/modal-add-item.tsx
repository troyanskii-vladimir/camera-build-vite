// import onClickOutside from 'react-onclickoutside';
import ModalAddItemContent from './modal-add-item-content';
import { Product } from '../../types/product';


type ModalAddItemProps = {
  product: Product;
  onCloseButtonClick: () => void;
}

function ModalAddItem({product, onCloseButtonClick}: ModalAddItemProps): JSX.Element {

  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay" />
        <ModalAddItemContent product={product} onCloseButtonClick={onCloseButtonClick} />
      </div>
    </div>
  );
}

export default ModalAddItem;
