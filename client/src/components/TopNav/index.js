import React from 'react';

import { Navbar } from 'react-bulma-components';
import './style.css';

function TopNav() {

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
          <Navbar.Item href="/login">
            Login
          </Navbar.Item>
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
