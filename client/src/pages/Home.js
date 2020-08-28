import React, { useEffect, useState} from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import ReactMapboxGl, {Layer} from 'react-mapbox-gl';
import {Feature} from 'react-mapbox-gl';
import api from '../utils/api';

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoiY2hyaXNqbTA5MyIsImEiOiJja2VkZHFsMjIwMnRrMnBud2J3YXVxcHJpIn0.8YUfTVkZw7oNUmkrJikDkQ'
});

function Home(){

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    loadArticles()
  }, [])

  function loadArticles() {
    api.getArticles()
      .then(res =>
        setArticles(res.data)
      )
      .catch(err => console.log(err));
  }

  

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
    <div>

      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: '50vh',
          width: '100vw'
        }}
      >
        <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
          <Feature coordinates={[47.609722, -122.3330056]} />
        </Layer>
      </Map>

      <Row>
        <Col xs={3}> {/** Article category links */}

          {/** fill with links (search?) to different types of articles */}
          <ListGroup> Categories {/** I would like to have this list be dynamic */}

            {
              categories.map(category => (
                // eslint-disable-next-line react/jsx-key
                <ListGroup.Item><a href="#">{category}</a></ListGroup.Item>
              ))
            }

          </ListGroup>

        </Col>

        <Col xs={9}> {/** List of articles */}

          {/** Start with a basic list of cards */}
          <ListGroup className="list-group">articles
            <ListGroup.Item>

              {
                articles.map(article => (
                  // eslint-disable-next-line react/jsx-key
                  <Card>
                    <Card.Img src="..." className="card-img-top" alt="..."></Card.Img>
                    <Card.Title>{article.title}</Card.Title>
                    {/** <Card.Subtitle className="mb-2 text-muted">Authored by: <a href='#'>{article.author}</a></Card.Subtitle>**/}
                  </Card>
                ))
              }

              
            </ListGroup.Item>
            {/* </li> */}
          </ListGroup>

        </Col>

      </Row>
    </div>
  );
}

const categories = [
  'Food',
  'Sports',
  'Travel',
  'Tech / Science',
  'Politics',
  'Entertainment',
  'Location'
];

export default Home; 