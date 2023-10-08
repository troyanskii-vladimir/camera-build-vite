import { Product } from '../../types/product';
import CatalogCardItem from '../catalog-card-item/catalog-card-item';


type CatalogCardsListProps = {
  products: Product[];
  onAddButtonClick: (product: Product) => void;
}

function CatalogCardsList({products, onAddButtonClick}: CatalogCardsListProps): JSX.Element {

  return (
    <div className="cards catalog__cards">
      {
        products.map((product) => (
          <CatalogCardItem
            key={product.id}
            product={product}
            onAddButtonClick={onAddButtonClick}
          />
        ))
      }
    </div>
  );
}

export default CatalogCardsList;
