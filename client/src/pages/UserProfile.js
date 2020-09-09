import React, { useEffect, useState } from 'react';
import {useStoreContext} from '../store';

import api from '../utils/api';



function UserProfile() {
  const [user, setUser] = useState(null);
  const [{userAuth}] = useStoreContext();

  useEffect(() => {
    loadUser(userAuth);
  },[userAuth]);

  
  function loadUser(auth) {
    if(auth) {
      api.getUser(auth.id)
        .then(res => {
          setUser(res.data);
        })
        .catch(err => console.log(err));
    }
    else
      console.log('undef');
    
  }

  if(user) {
    console.log(user);
    return (
      <div>
        {user._id}
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