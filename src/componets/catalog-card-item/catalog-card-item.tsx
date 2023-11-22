import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { AppRoute, COUNT_OF_RATING_STARS } from '../../config';
import { ProductCart } from '../../types/cart';
import browserHistory from '../../browser-history';


type CatalogCardItemProps = {
  product: Product;
  productsInCart?: ProductCart[];
  onAddButtonClick: (product: Product) => void;
}

function CatalogCardItem({product, productsInCart = [], onAddButtonClick}: CatalogCardItemProps): JSX.Element {
  const ratingArray = Array.from({ length: COUNT_OF_RATING_STARS }, (_e, i) => (i < product.rating) ? {class: 'full-', i} : {class: '', i});

  const handleAddButtonClick = (): void => {
    onAddButtonClick(product);
  };

  const isAddedCart = productsInCart?.find((prod) => prod.id === product.id);

  return (
    <div className='product-card is-active'>
      <div className="product-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`${product.previewImg}, ${product.previewImgWebp2x} 2x`}
          />
          <img
            src={product.previewImg}
            srcSet={`${product.previewImg2x} 2x`}
            width={280}
            height={240}
            alt={product.name}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {
            ratingArray.map((star) => (
              <svg width={17} height={16} aria-hidden="true" key={star.i}>
                <use xlinkHref={`#icon-${star.class}star`} />
              </svg>
            ))
          }
          <p className="visually-hidden">Рейтинг: {product.rating}</p>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>{product.reviewCount}
          </p>
        </div>
        <p className="product-card__title">
          {product.name}
        </p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{product.price?.toLocaleString()} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        {
          !isAddedCart &&
            <button
              className="btn btn--purple product-card__btn"
              type="button"
              onClick={(evt) => {
                evt.preventDefault();
                evt.stopPropagation();
                handleAddButtonClick();
              }}
            >
              Купить
            </button>
        }
        {
          isAddedCart &&
            <button
              className="btn btn--purple-border product-card__btn product-card__btn--in-cart"
              type="button"
              onClick={() => {
                browserHistory.replace(AppRoute.Cart);
              }}
            >
              <svg width={16} height={16} aria-hidden="true">
                <use xlinkHref="#icon-basket" />
              </svg>
              В корзине
            </button>
        }
        <Link className="btn btn--transparent" to={`${AppRoute.Product}/${product.id}`}>
          Подробнее
        </Link>
      </div>
    </div>
  );
}

export default CatalogCardItem;
