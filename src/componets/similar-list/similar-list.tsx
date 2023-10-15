
import { useEffect, useState } from 'react';
import { Product } from '../../types/product';
import CatalogCardItem from '../catalog-card-item/catalog-card-item';

const COUNT_OF_SIMILAR_PRODUCTS_ON_PAGE = 3;

type SimilarListProps = {
  products: Product[];
  onAddButtonClick: (product: Product) => void;
}

function SimilarList({products, onAddButtonClick}: SimilarListProps): JSX.Element {
  const [activeProductNumbers, setActiveProductNumbers] = useState([0, 1, 2]);

  useEffect(() => {
    setActiveProductNumbers([0 , 1, 2]);
  }, [products]);

  return (
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <div className="product-similar__slider">
            <div className="product-similar__slider-list">
              {
                products.map((product, index) => {
                  const isActive = activeProductNumbers.includes(index);

                  return (
                    <CatalogCardItem
                      key={product.id}
                      product={product}
                      onAddButtonClick={onAddButtonClick}
                      isActive={isActive}
                    />
                  );
                })
              }
            </div>
            <button
              // className="slider-controls slider-controls--prev"
              className="slider-controls--prev"
              type="button"
              aria-label="Предыдущий слайд"
              disabled={activeProductNumbers.includes(0)}
              onClick={(evt) => {
                evt.preventDefault();

                setActiveProductNumbers(() => {
                  const result: number[] = [];
                  activeProductNumbers.forEach((product) => {
                    result.push(product - COUNT_OF_SIMILAR_PRODUCTS_ON_PAGE);
                  });
                  return result;
                });
              }}
            >
              <svg width={7} height={12} aria-hidden="true">
                <use xlinkHref="#icon-arrow" />
              </svg>
            </button>
            <button
              // className="slider-controls slider-controls--next"
              className="slider-controls--next"
              type="button"
              aria-label="Следующий слайд"
              disabled={activeProductNumbers.includes(products.length - 1)}
              onClick={(evt) => {
                evt.preventDefault();

                setActiveProductNumbers(() => {
                  const result: number[] = [];
                  activeProductNumbers.forEach((product) => {
                    result.push(product + COUNT_OF_SIMILAR_PRODUCTS_ON_PAGE);
                  });
                  return result;
                });
              }}
            >
              <svg width={7} height={12} aria-hidden="true">
                <use xlinkHref="#icon-arrow" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SimilarList;
