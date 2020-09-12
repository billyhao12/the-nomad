import React from 'react';

import { Navbar } from 'react-bulma-components';
import './style.css';
import { useIsAuthenticated, useLogout } from '../../utils/auth';

function TopNav() {

  const isAuthorizedUser = useIsAuthenticated();
  const logOut = useLogout();

  return (

    <Navbar className='is-primary'>

      <Navbar.Brand>
        <Navbar.Item renderAs="a" href="/">
          The Nomad
        </Navbar.Item>
        <Navbar.Burger>
        </Navbar.Burger>
      </Navbar.Brand>

      <Navbar.Menu>

        <Navbar.Container position="end">
          <Navbar.Item href="/createArticle">
            Create Article
          </Navbar.Item>
          {isAuthorizedUser ? (
            <Navbar.Item onClick={logOut}>
          Logout
            </Navbar.Item>
          ) : (
            <Navbar.Item href="/login">
            Login
            </Navbar.Item>
          )}
          <Navbar.Item href="/register">
            Register
          </Navbar.Item>
          <Navbar.Item href='/user'>
            <img src={require('../../icons/nomadIcon5.png')} />
          </Navbar.Item>
        </Navbar.Container>

      </Navbar.Menu>

    </Navbar>
    
  )

}

export default TopNav;
