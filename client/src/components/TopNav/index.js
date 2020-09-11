import React, { useState } from 'react';

import { Navbar } from 'react-bulma-components';
import { Form } from 'react-bulma-components';
import { Button } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';

const { Field, Control, Input } = Form;

function TopNav() {

  const [search, setSearch] = useState();

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

        <Navbar.Container>
          <Navbar.Item renderAs='div'>
            <Field className="has-addons">
              <Control className="is-expanded">
                <Input
                  className="is-info is-fullwidth"
                  placeholder="Search"
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </Control>
              <Control>
                <Button className="is-info" type="primary">
                  <FontAwesomeIcon icon="search" />
                </Button>
              </Control>
            </Field>
          </Navbar.Item>
        </Navbar.Container>

        <Navbar.Container position="end">
          <Navbar.Item href="/createArticle">
            Create Article
          </Navbar.Item>
          <Navbar.Item href="/login">
            Login
          </Navbar.Item>
          <Navbar.Item href= "/logout">
            Log Out
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
