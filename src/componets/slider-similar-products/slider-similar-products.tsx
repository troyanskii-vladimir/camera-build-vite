import { Swiper, SwiperSlide } from 'swiper/react';
import { Product } from '../../types/product';
import CatalogCardItem from '../catalog-card-item/catalog-card-item';


type SliderSimilarProductsProps = {
  products: Product[];
  onAddButtonClick: (product: Product) => void;
}

function SliderSimilarProducts({products, onAddButtonClick}: SliderSimilarProductsProps): JSX.Element {
  return (
    <Swiper>
      {
        products.map((product) => (
          <SwiperSlide key={product.id}>
            <CatalogCardItem
              product={product}
              onAddButtonClick={onAddButtonClick}
            />
          </SwiperSlide>
        ))
      }
    </Swiper>
  );
}

export default SliderSimilarProducts;
