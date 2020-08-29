import React, { useEffect, useState} from 'react';
import{Col, Row, Container, ListGroup, Card} from 'react-bootstrap';
import mapboxgl from 'mapbox-gl';
import Map from '../components/Map';
import api from '../utils/api';
// import {Feature} from 'react-mapbox-gl';



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
    <div>
      <Container>
      <Map />
      </Container>
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
    )
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
    name: 'Turns out, pitbuls are super nice!',
    author: 'Elton Presely'
  }
];

export default Home; 
