import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import styles from './styles.module.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import Banner from '../banner/banner';
import { PromoProduct } from '../../types/promo-product';


type SliderProps = {
  products: PromoProduct[];
}

function Slider({products}: SliderProps): JSX.Element {

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      loop
      autoplay={{
        delay: 3000,
      }}
      pagination={{
        clickable: true,
        bulletClass: styles.swiperBullet,
        bulletActiveClass: styles.swiperActiveBullet,
        clickableClass: styles.swiperContainerPagination,
      }}
    >
      {
        products.map((product) => (
          <SwiperSlide key={product.id}>
            <Banner product={product} />
          </SwiperSlide>
        ))
      }
    </Swiper>
  );
}

export default Slider;
