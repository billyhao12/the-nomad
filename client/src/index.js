import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { StoreProvider } from './store';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  (
    <StoreProvider>
      <App />
    </StoreProvider>
  ),

  document.getElementById('root')
);

registerServiceWorker();
