import { Link, useSearchParams } from 'react-router-dom';
import { COUNT_OF_NUMBERS_PAGINATION } from '../../config';


type PaginationProps = {
  currentPage: number;
  countOfPages: number;
  onNumberButtonClick: (num: number) => void;
}

function Pagination({currentPage, countOfPages, onNumberButtonClick}: PaginationProps): JSX.Element {

  const [searchParams] = useSearchParams();
  searchParams.delete('page');


  const pageNumbers = (page: number): number[] => {
    const result: number[] = [];

    const maxPage = Math.ceil(page / COUNT_OF_NUMBERS_PAGINATION) * COUNT_OF_NUMBERS_PAGINATION;
    const minPage = maxPage - 2;

    for (let i = minPage; i <= maxPage; i++) {
      if (i <= countOfPages) {
        result.push(i);
      }
    }

    return result;
  };

  const pages = pageNumbers(currentPage);

  const isPreviousButtonActive = currentPage >= 4;
  const isNextButtonActive = countOfPages - currentPage > 1;


  return (
    <div className="pagination">
      <ul className="pagination__list">
        {
          isPreviousButtonActive &&
          <li className="pagination__item">
            <Link
              className="pagination__link pagination__link--text"
              to={`?${searchParams.toString()}${searchParams.toString().length ? '&' : ''}page=${pages[0] - 1}`}
              onClick={() => {
                onNumberButtonClick(currentPage - 1);
              }}
            >
              Назад
            </Link>
          </li>
        }
        {
          pages.map((page) => (
            <li className="pagination__item" key={page}>
              <Link
                className={`pagination__link ${page === currentPage ? 'pagination__link--active' : ''}`}
                to={`?${searchParams.toString()}${searchParams.toString().length ? '&' : ''}page=${page}`}
                onClick={() => {
                  onNumberButtonClick(page);
                }}
              >
                {page}
              </Link>
            </li>
          ))
        }
        {
          isNextButtonActive &&
          <li className="pagination__item">
            <Link
              className="pagination__link pagination__link--text"
              to={`?${searchParams.toString()}${searchParams.toString().length ? '&' : ''}page=${pages[2] + 1}`}
              onClick={() => {
                onNumberButtonClick(currentPage + 1);
              }}
            >
              Далее
            </Link>
          </li>
        }

      </ul>
    </div>
  );
}

export default Pagination;
