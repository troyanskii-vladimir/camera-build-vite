import MainPage from '../../pages/catalog/catalog';
import ProductPage from '../../pages/product/product';
import BasketPage from '../../pages/basket/basket';
import Page404 from '../../pages/404/404';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../config';
import { useEffect } from 'react';
import { fetchProducts } from '../../store/api-action';
import { useAppDispatch } from '../../hooks';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>

          <Route
            path={AppRoute.Catalog}
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
            element={<BasketPage />}
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
