import MainPage from '../../pages/catalog/catalog';
import ProductPage from '../../pages/product/product';
import BasketPage from '../../pages/basket/basket';
import Page404 from '../../pages/404/404';
import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../config';
import { useEffect } from 'react';
import { fetchProductsAction, fetchPromoProductsAction } from '../../store/api-action';
import { useAppDispatch } from '../../hooks';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import { addProductsToCart } from '../../store/cart-data/actions';
import { getCartData } from '../../services/local-cart';


function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductsAction());
    dispatch(fetchPromoProductsAction());
    dispatch(addProductsToCart(getCartData()));
  }, [dispatch]);


  return (
    <HelmetProvider>
      <ScrollToTop />
      <Routes>

        <Route
          path={AppRoute.Catalog}
          element={<MainPage />}
        >
          <Route path='?page=:id' element={<MainPage />} />
        </Route>

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
    </HelmetProvider>
  );
}

export default App;
