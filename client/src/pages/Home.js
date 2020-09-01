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
import TopNav from '../components/TopNav';
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


  const articlesCoordinates= articles.map((article) => ({
    lat: article.lat,
    long: article.long,
    id: article._id
  }))
 
  console.log(articlesCoordinates)
  
  return (
    <div>
      <Container>
        <Map coordinates= {articlesCoordinates} />
      </Container>
      <TopNav />
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
