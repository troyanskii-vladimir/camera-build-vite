import { useAppSelector } from '../../hooks';
import { getProductsLoadingStatus } from '../../store/product-data/selectors';
import { ProductCart } from '../../types/cart';
import { Product } from '../../types/product';
import CatalogCardItem from '../catalog-card-item/catalog-card-item';
import Loader from '../loader/loader';


type CatalogCardsListProps = {
  products: Product[];
  productsInCart: ProductCart[];
  onAddButtonClick: (product: Product) => void;
}

function CatalogCardsList({products, productsInCart, onAddButtonClick}: CatalogCardsListProps): JSX.Element {
  const isProductsLoading = useAppSelector(getProductsLoadingStatus);

  if (isProductsLoading) {
    return (<Loader />);
  }

  if (products.length === 0) {
    return (<h3 className='product-card__info'>По вашему запросу ничего не найдено</h3>);
  }

  return (
    <div className="cards catalog__cards">
      {
        products.map((product) => (
          <CatalogCardItem
            key={product.id}
            product={product}
            productsInCart={productsInCart}
            onAddButtonClick={onAddButtonClick}
          />
        ))
      }
    </div>
  );
}

export default CatalogCardsList;
