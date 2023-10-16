import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Product } from '../../types/product';
import CatalogCardItem from '../catalog-card-item/catalog-card-item';
import { A11y, Navigation } from 'swiper/modules';
import SwiperSimilarButtons from './slider-similar-buttons';
import styles from './test.module.css';

type SliderSimilarProps = {
  products: Product[];
  onAddButtonClick: (product: Product) => void;
}

const COUNT_OF_SIMILAR_PRODUCTS_ON_PAGE = 3;

function SliderSimilar({products, onAddButtonClick}: SliderSimilarProps): JSX.Element {

  const subarray = [];
  for (let i = 0; i < Math.ceil(products.length / COUNT_OF_SIMILAR_PRODUCTS_ON_PAGE); i++){
    subarray[i] = products.slice((i * COUNT_OF_SIMILAR_PRODUCTS_ON_PAGE), (i * COUNT_OF_SIMILAR_PRODUCTS_ON_PAGE) + COUNT_OF_SIMILAR_PRODUCTS_ON_PAGE);
  }


  return (
    <Swiper
      modules={[Navigation, A11y]}
      navigation={{
        prevEl: '.slider-controls--prev',
        nextEl: '.slider-controls--next',
      }}
    >
      <SwiperSimilarButtons />
      {
        subarray.map((page) => (
          <SwiperSlide key={page[0].id}>
            <div className="product-similar__slider-list">
              {
                page.map((product) => (
                  <CatalogCardItem
                    key={product.id}
                    product={product}
                    onAddButtonClick={onAddButtonClick}
                    isActive
                  />
                ))
              }
            </div>
          </SwiperSlide>
        ))
      }
      {/* <button
          // className="slider-controls slider-controls--next"
          className="slider-controls--next"
          type="button"
          aria-label="Следующий слайд"
          // onClick={() => swiperRef.current?.swiper.slideNext()}
        >SDGsdgsdg
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button> */}
      {/* <div className=".next" /> */}
    </Swiper>
  );
}

export default SliderSimilar;
