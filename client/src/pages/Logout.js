import React from 'react';
import Login from './Login';

function Logout() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const handleClick = e => {
    setLoggedIn(!loggedIn);
  };
  return (
    <div>
      {loggedIn ? (
        <Logout handleClick={handleClick} />
      ) : (
        <Login handleClick={handleClick} />
      )}
    </div>
  );
}

// function LogOut(props) {
//   return (
//     <div>
//       <h3>You are not signed in</h3>
//       <button onClick={props.handleClick}>Logout</button>
//     </div>
//   );
// }
export default Logout;