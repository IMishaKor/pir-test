import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AuthStore, { StoreProvider } from './store/AuthStore';

import 'devextreme/dist/css/dx.light.css';
import './index.css';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <StoreProvider store={new AuthStore()}>
      <App />
    </StoreProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
