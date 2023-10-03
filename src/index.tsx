import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './componets/app/app';
import { ToastContainer } from 'react-toastify';
import { store } from './store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>
);
