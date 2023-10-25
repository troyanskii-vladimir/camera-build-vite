import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './componets/app/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import { store } from './store';
import { Provider } from 'react-redux';
import HistoryRouter from './componets/history-route.tsx/history-route';
import browserHistory from './browser-history';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer />
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
