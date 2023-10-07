import { Product } from '../../types/product';
import CatalogCardItem from '../catalog-card-item/catalog-card-item';


type CatalogCardsListProps = {
  products: Product[];
}

function CatalogCardsList({products}: CatalogCardsListProps): JSX.Element {

  return (
    <div className="cards catalog__cards">
      {
        products.map((product) =>
          <CatalogCardItem key={product.id} product={product} />
        )
      }
    </div>
  );
}

export default CatalogCardsList;
