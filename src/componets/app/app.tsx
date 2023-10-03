import MainPage from '../../pages/main/main';
import ProductPage from '../../pages/product/product';
import CartPage from '../../pages/cart/cart';
import Page404 from '../../pages/404/404';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../config';

function App(): JSX.Element {

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>

          <Route
            path={AppRoute.Main}
            element={
              <MainPage />
            }
          />

          <Route path={AppRoute.Product}>
            <Route index element={<Page404 />} />
            <Route path=':id' element={<ProductPage />} />
          </Route>

          <Route
            path={AppRoute.Cart}
            element={<CartPage />}
          />

          <Route
            path='*'
            element={<Page404 />}
          />

        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
