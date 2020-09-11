/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { useAuthTokenStore } from './utils/auth';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout'; 
import Register from './pages/Register';
import ArticleDetailView from './pages/ArticleDetailView';
import ArticleCreate from './pages/ArticleCreate';
import TopNav from './components/TopNav';
import UserProfile from './pages/UserProfile';

function App() {

  useAuthTokenStore();
  return (
    <div className="App">
      <Router>
        <div>
          <TopNav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="logout" component={Logout} />
            <Route exact path="/register" component={Register} />
            <Route path="/article" component={ArticleDetailView} />
            <Route exact path="/createArticle" component={ArticleCreate} />
            <Route path="/user" component={UserProfile} />
          </Switch>
        </div>
      </Router>
    </div>
  );
  
}

export default App;
