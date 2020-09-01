import React, { useEffect, useState} from 'react';
import{Col, Row, Container, ListGroup, Card} from 'react-bootstrap';
import Map from '../components/Map';
import api from '../utils/api';
import propTypes from 'prop-types';
// import {Feature} from 'react-mapbox-gl';
var lat ;
var long;


function Home(){
  const [articles, setArticles] = useState([]);
  const [position, setPosition] = useState([]);

  useEffect(() => {
    loadArticles()
  }, [])

  useEffect(() => {
    loadArticles()
    loadPosition()
  }, [])


  function loadArticles() {
    api.getArticles()
      .then(res =>
        setArticles(res.data)
      )
      .catch(err => console.log(err));
      
  }

  const articlesCoordinates= articles.map((article) => (
    {
      lat: article.lat,
      long: article.long,
      id: article._id
    }
  ))
 
  //User GPS location
 
function loadPosition() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position);
    }
    function position(pos) {
      setPosition(pos);
    }
  

  if ('geolocation' in navigator) {
    console.log('GeoLocation is available');
  } else {
    console.log('GeoLocation is not available');
  }

  navigator.geolocation.watchPosition(
    function(position) {
      console.log(position)
    },
    function(error) {
      console.error('Error Code = ' + error.code + ' - ' + error.message);
    });

 
  return (
    <div>
      <Container>
        <Map coordinates= {articlesCoordinates} />
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
  )}

const categories = [
  'Food',
  'Sports',
  'Travel',
  'Tech / Science',
  'Politics',
  'Entertainment',
  'Location'
];

Home.propTypes = {
  children: propTypes.node,
};

export default Home; 
