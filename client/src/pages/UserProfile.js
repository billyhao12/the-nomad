import React, { useEffect, useState } from 'react';
import {useStoreContext} from '../store';
import api from '../utils/api';

import {Container, Heading, Hero, Box} from 'react-bulma-components';
import UserArticle from '../components/UserArticle';
<<<<<<< HEAD
=======
import CommentView from '../components/CommentView';
import CheckinDisplay from '../components/CheckinDisplay';
>>>>>>> 5c08781f523f91d2ccb29698821a43e4d9dd0728

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
<<<<<<< HEAD
    else
      console.log('undef');
  }

=======
  }
  
>>>>>>> 5c08781f523f91d2ccb29698821a43e4d9dd0728
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
<<<<<<< HEAD
            {/* {
              user.comments > 0 &&
              // user.articles.map((article, index) => (

              // ))
            } */}
=======
            {
              user.comments.length > 0 &&
              user.comments.map((comment, index) => (
                <CommentView commentId={comment} key={index} />
              ))
            }
          </Container>
          <Container>
            My Check-Ins:
            {
              user.checkIns.length > 0 &&
              user.checkIns.map((checkIn, index) => (
                <div key={index}>
                  <CheckinDisplay checkInId={checkIn} key={index} />
                </div>
              ))
            }
>>>>>>> 5c08781f523f91d2ccb29698821a43e4d9dd0728
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