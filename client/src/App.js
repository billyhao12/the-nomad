/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { useAuthTokenStore } from './utils/auth';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import TopNav from './components/TopNav';
import Categories from './components/Categories';
import Row from 'react-bootstrap/Row';

function App() {

  useAuthTokenStore();
  return (
    <div className="App">
      <Router>
        <div>
          <TopNav />
          
          <Row>
            <Categories />
          </Row>
          
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </div>
      </Router>
    </div>
  );
  
}

export default App;
