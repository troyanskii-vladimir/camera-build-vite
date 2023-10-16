import { useSwiper } from 'swiper/react';

function SwiperSimilarButtons () {
  const swiper = useSwiper();

  return (
    <>
      {/* <button onClick={() => swiper.slidePrev()}>Prev</button>
      <button type='button' className='slider-controls slider-controls--next' onClick={() => swiper.slideNext()}>Next</button> */}
      <button
        className="slider-controls"
        type="button"
        aria-label="Предыдущий слайд"
        onClick={() => console.log('test')}
      >
        <svg width={7} height={12} aria-hidden="true">
          <use xlinkHref="#icon-arrow" />
        </svg>
      </button>
    </>
  );
}

export default SwiperSimilarButtons;
