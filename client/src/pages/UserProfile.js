import React, { useEffect, useState } from 'react';
import {useStoreContext} from '../store';
import api from '../utils/api';

import {Container, Heading, Hero, Box} from 'react-bulma-components';
import UserArticle from '../components/UserArticle';

function UserProfile() {
  const [user, setUser] = useState();
  const [{userAuth}] = useStoreContext();

  useEffect(() => {
    loadUser(userAuth);
  },[userAuth]);

  function loadUser(auth) {
    if(auth) {
      api.getUser(auth.id)
        .then(res => setUser(res.data))
        .catch(err => console.log(err));
    }
    else
      console.log('undef');
  }

  if(user) {
    return (
      <div>
        <Box>
          <Container>
            <Hero color='light' className='has-text-centered'>
              <Hero.Body>
                <Container>
                  <Heading>
                    Hello, {user.name}!
                  </Heading>
                </Container>
              </Hero.Body>
            </Hero>
          </Container>
          <Container>
            Your {user.articles.length} Articles:
            {
              user.articles.length > 0 &&
              user.articles.map((article, index) => (
                <div key={index}>
                  <UserArticle articleId={article} key={index} />
                </div>
              ))
            }
          </Container>
          <Container>
            Your Comments:
            {/* {
              user.comments > 0 &&
              // user.articles.map((article, index) => (

              // ))
            } */}
          </Container>
          <Container>
            My Check-Ins:
          </Container>
        </Box>
      </div>
    )
  }
  else {
    return (
      <p>User Profile Page</p>
    );
  }
}

export default UserProfile;