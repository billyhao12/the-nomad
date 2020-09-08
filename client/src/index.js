import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { StoreProvider } from './store';

import 'react-bulma-components/dist/react-bulma-components.min.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

library.add(faSearch, faArrowUp, faArrowDown);

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,

  document.getElementById('root'),
);

registerServiceWorker();
