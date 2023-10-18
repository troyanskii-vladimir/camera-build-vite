import { Link } from 'react-router-dom';
import Footer from '../../componets/footer/footer';
import Header from '../../componets/header/header';
import { AppRoute } from '../../config';


function Page404(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="page-content">
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Страница не существует</h1>
              <div className="page-content__columns">
                <Link className="btn btn--purple product-card__btn" to={AppRoute.Catalog}>Вернуться на главную страницу</Link>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Page404;
