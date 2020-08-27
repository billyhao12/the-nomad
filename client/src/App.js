/* eslint-disable react/prefer-stateless-function */
import React from 'react';

import { useAuthTokenStore } from './utils/auth';

import {BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {

  useAuthTokenStore();
  return (
    <div className="App">
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </div>
      </Router>
    </div>
  );
  
}

export default App;
