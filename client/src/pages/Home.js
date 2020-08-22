import React from "react";
import{useIsAuthenticated, useLogout } from "../utils/auth"

function Home(){

  const isAuth = useIsAuthenticated();
  const logout = useLogout();

    return (
      <div>
        <h1>Home Page</h1>
        {
          isAuth
          ?<button onClick={logout}>Logout</button>
          : <a href="/login">Login</a>
        }
        <br/>
        <a href="/register">Register</a>
      </div>
    );
}

export default Home; 