import React from 'react';
import{useIsAuthenticated, useLogout } from '../utils/auth'

function Home(){

  const isAuth = useIsAuthenticated();
  const logout = useLogout();

  return (
  // <div>
  //   <h1>Home Page</h1>
  //   {
  //     isAuth
  //       ?<button onClick={logout}>Logout</button>
  //       : <a href="/login">Login</a>
  //   }
  //   <br/>
  //   <a href="/register">Register</a>
  // </div>


    <div> {/*main div*/}

      <nav className="navbar navbar-light bg-dark"> {/** navbar div */}
        {
          isAuth ? <button onClick={logout}>Logout</button> : <a href="/register">Register</a>
        }
      </nav>

      <div className="container"> {/** content container div*/}


        <div className="col-sm-3"> {/** Article category links */}

          {/** fill with links (search?) to different types of articles */}
          <ul className="list-group"> Categories {/** I would like to have this list be dynamic */}
            <li className="list-group-item">Food</li>
            <li className="list-group-item">Sports</li>
            <li className="list-group-item">Travel</li>
            <li className="list-group-item">Tech / Science</li>
            <li className="list-group-item">Politics</li>
            <li className="list-group-item">Entertainment</li>
            <li className="list-group-item">Location</li>
          </ul>

        </div>

        <div className="col-sm-9"> {/** List of articles */}

          {/** Start with a basic list of cards */}
          <ul className="list-group">articles

            <li className="list-group-item">
              <div className="card">
                <img src="..." className="card-img-top" alt="..."></img>
              </div>
            </li>
          </ul>

        </div>

      </div>

    </div>
  );
}

//placeholder article list
const articles = [
  {
    id: 1,
    name: 'The Verge doesn\'t know how to build a PC!!',
    author: 'Darrin Van Winkle'
  },
  {
    id: 2,
    name: 'Lawn work is much harder than expected',
    author: 'Ozzie Osbourne'
  },
  {
    id: 3,
    name: 'The Verge doesn\'t know how to build a PC!!',
    author: 'Darrin Van Winkle'
  }
];

export default Home; 