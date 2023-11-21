import { ProductCart } from '../../types/cart';
import BasketItem from '../basket-item/basket-item';


type BasketListProps = {
  products: ProductCart[];
  onDeleteButtonClick: (prod: ProductCart) => void;
}


function BasketList({products, onDeleteButtonClick}: BasketListProps): JSX.Element {
  return (
    <ul className="basket__list">
      {
        products.map((product) => (
          <li className="basket-item" key={product.id}>
            <BasketItem product={product} onDeleteButtonClick={onDeleteButtonClick} />
          </li>
        ))
      }
    </ul>
  );
}

export default BasketList;
