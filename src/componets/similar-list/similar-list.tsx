import { Product } from '../../types/product';
import SliderSimilar from '../slider-similar/slider-similar';


type SimilarListProps = {
  products: Product[];
  onAddButtonClick: (product: Product) => void;
}


function SimilarList({products, onAddButtonClick}: SimilarListProps): JSX.Element {

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
