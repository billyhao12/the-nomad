import React, { useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Categories from '../components/Categories';
import ArticlePreview from '../components/ArticlePreview';
import{Col, Row, Container, ListGroup, Card} from 'react-bootstrap';
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
        <Col xs={3} className="px-0"> {/** Article category links */}

          <Categories />

        </Col>

        <Col xs={9} className="px-0"> {/** List of articles */}

          {/** Start with a basic list of cards */}
          <ListGroup className="list-group">articles
            <ListGroup.Item>
              {
                articles.map(article => (
                  // eslint-disable-next-line react/jsx-key

                  <ArticlePreview article={article} />

                  
                ))
              }              
            </ListGroup.Item>
            {/* </li> */}
          </ListGroup>

        </Col>

      </Row>
    </div>
  )}

export default Home; 
