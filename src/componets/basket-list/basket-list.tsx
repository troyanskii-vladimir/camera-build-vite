import { ProductCart } from '../../types/cart';
import BasketItem from '../basket-item/basket-item';


type BasketListProps = {
  products: ProductCart[];
}


function BasketList({products}: BasketListProps): JSX.Element {
  return (
    <ul className="basket__list">
      {
        products.map((product) => (
          <li className="basket-item" key={product.id}>
            <BasketItem product={product} />
          </li>
        ))
      }
    </ul>
  );
}

export default BasketList;
