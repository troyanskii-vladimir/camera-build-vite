import { Link } from 'react-router-dom';
import { AppRoute } from '../../config';

const COUNT_OF_NUMBERS = 3;


type PaginationProps = {
  currentPage: number;
  countOfPages: number;
  onNumberButtonClick: (num: number) => void;
}

function Pagination({currentPage, countOfPages, onNumberButtonClick}: PaginationProps): JSX.Element {

  const pageNumbers = (page: number): number[] => {
    const result: number[] = [];

    const maxPage = Math.ceil(page / COUNT_OF_NUMBERS) * 3;
    const minPage = maxPage - 2;

    for (let i = minPage; i <= maxPage; i++) {
      if (i <= countOfPages) {
        result.push(i);
      }
    }

    return result;
  };

  const pages = pageNumbers(currentPage);

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {
          currentPage >= 4 &&
          <li className="pagination__item">
            <Link
              className="pagination__link pagination__link--text"
              to={`${AppRoute.Catalog}?page=${pages[0] - 1}`}
              onClick={() => {
                onNumberButtonClick(pages[0] - 1);
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
                to={`${AppRoute.Catalog}?page=${page}`}
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
          countOfPages - currentPage > 1 &&
          <li className="pagination__item">
            <Link
              className="pagination__link pagination__link--text"
              to={`${AppRoute.Catalog}?page=${pages[2] + 1}`}
              onClick={() => {
                onNumberButtonClick(pages[2] + 1);
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
