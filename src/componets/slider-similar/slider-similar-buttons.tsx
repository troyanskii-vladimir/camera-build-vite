import { useSwiper } from 'swiper/react';
import styles from './test.module.css';

function SwiperSimilarButtons () {
  const swiper = useSwiper();

  return (
    <div onClick={() => console.log('test1')}>
      {/* <button onClick={() => swiper.slidePrev()}>Prev</button>
      <button type='button' className='slider-controls slider-controls--next' onClick={() => swiper.slideNext()}>Next</button> */}
      <button
        className={styles.test}
        type="button"
        aria-label="Предыдущий слайд"
        onClick={() => swiper.slideNext()}
      >
        <svg width={7} height={12} aria-hidden="true" onClick={() => console.log('test2')}>
          <use xlinkHref="#icon-arrow" />
        </svg>
      </button>
    </div>
  );
}

export default SwiperSimilarButtons;
