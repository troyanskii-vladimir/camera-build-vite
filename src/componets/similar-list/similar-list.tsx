import { useEffect, useState } from 'react';
import { Product } from '../../types/product';
import CatalogCardItem from '../catalog-card-item/catalog-card-item';
import SliderSimilar from '../slider-similar/slider-similar';


// const COUNT_OF_SIMILAR_PRODUCTS_ON_PAGE = 3;

type SimilarListProps = {
  products: Product[];
  onAddButtonClick: (product: Product) => void;
}

function SimilarList({products, onAddButtonClick}: SimilarListProps): JSX.Element {
  // const [activeProductNumbers, setActiveProductNumbers] = useState([0, 1, 2]);

  // useEffect(() => {
  //   setActiveProductNumbers([0, 1, 2]);
  // }, [products]);

  return (
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <div className="product-similar__slider">
            <SliderSimilar products={products} onAddButtonClick={onAddButtonClick} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default SimilarList;
