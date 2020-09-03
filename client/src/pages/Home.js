import React, { useEffect, useState} from 'react';

import ArticlePreview from '../components/ArticlePreview';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Map from '../components/Map';
import Categories from '../components/Categories';
import api from '../utils/api';
import propTypes from 'prop-types';
// import {Feature} from 'react-mapbox-gl';

function Home(){
  const [articles, setArticles] = useState([]);
  const [position, setPosition] = useState([]);

  useEffect(() => {
    loadArticles()
    loadPosition()
  },[])
  
  function loadArticles() {
    api.getArticles()
      .then(res =>
        setArticles(res.data)
      )
      .catch(err => console.log(err));
  }
  
  function loadPosition() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position);
    }
  
    function position(pos) {
      setPosition({latitude: pos.coords.latitude, longitude: pos.coords.longitude});
    }
  }

  const articlesCoordinates= articles.map((article) => (
    { 'type': 'Feature',
      'properties': {
        'id': article._id,
        'details': '<strong>'+ article.title + '</strong> <br><img src="'+ article.image +'" width="100">'
      },
      'geometry':
      {
        'type': 'Point',
        'coordinates': [article.long, article.lat, 0],
      }
    }
  ))
 
  //User GPS location
  
  return (
    <div>
      <Container>
        <Map 
          userLatitude={position.latitude}
          userLongitude={position.longitude}
          articlesCoordinates={articlesCoordinates}
        />
      </Container>
      <Row>
        <Col xs={3} className="px-0"> {/** Article category links */}

          <Categories />

        </Col>

        <Col xs={9} className="px-0"> {/** List of articles */}

          {/** Start with a basic list of cards */}
          <ListGroup className="list-group">articles
            <ListGroup.Item>
              {
                articles.map((article, index) => (
                  // eslint-disable-next-line react/jsx-key
                  <ArticlePreview article={article} key={index}/>

                ))

              }
              
            </ListGroup.Item>
            {/* </li> */}
          </ListGroup>

        </Col>

      </Row>
    </div>
  )}

Home.propTypes = {
  children: propTypes.node,
};


export default Home; 
