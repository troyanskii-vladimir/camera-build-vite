import styles from './test.module.css';

function SwiperSimilarButtons () {

  return (
    <>
      <button
        className='slider-controls slider-controls--prev'
        type="button"
        aria-label="Предыдущий слайд"
        onClick={() => console.log('tttt1')}
      >
        <svg width={7} height={12} aria-hidden="true">
          <use xlinkHref="#icon-arrow" />
        </svg>
      </button>
      <button
        className='slider-controls slider-controls--next'
        type="button"
        aria-label="Следующий слайд"
        onClick={() => console.log('tttt2')}
      >
        <svg width={7} height={12} aria-hidden="true">
          <use xlinkHref="#icon-arrow" />
        </svg>
      </button>
    </>
  );
}

export default SwiperSimilarButtons;
