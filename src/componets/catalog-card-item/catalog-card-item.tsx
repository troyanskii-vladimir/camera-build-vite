import { Product } from '../../types/product';


type CatalogCardItemProps = {
  product: Product;
}

function CatalogCardItem({product}: CatalogCardItemProps): JSX.Element {
  const ratingArray = Array.from({ length: 5 }, (_e, i) => (i < product.rating) ? {class: 'full-', i} : {class: '', i});


  return (
    <div className="product-card">
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
          <span className="visually-hidden">Цена:</span>{product.price.toLocaleString()} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button
          className="btn btn--purple product-card__btn"
          type="button"
        >
          Купить
        </button>
        <a className="btn btn--transparent" href="#">
          Подробнее
        </a>
      </div>
    </div>
  );
}

export default CatalogCardItem;
