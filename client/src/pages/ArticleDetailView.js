import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
// import ListGroup from 'react-bootstrap/ListGroup';
// import Card from 'react-bootstrap/Card';
// import ReactMapboxGl, {Layer} from 'react-mapbox-gl';
// import {Feature} from 'react-mapbox-gl';
import api from '../utils/api';
import {Container, Image, Box, Hero, Heading, Navbar, Tile} from 'react-bulma-components';
import PropTypes from 'prop-types';

import ArticlePreview from '../components/ArticlePreview';

ArticleDetailView.propTypes = {
  location: PropTypes.object,
  pathname: PropTypes.string,
}

function ArticleDetailView(props) {
  const [article, setArticle] = useState();

  const pathname = props.location.pathname;

  const articleid = pathname.split('/');

  const idString = articleid[2];

  useEffect(() => {
    loadArticle(idString)
  }, [idString]);

  function loadArticle(id) {
    api.getArticle(id)
      .then(res =>{
        setArticle(res.data)

        async function blah(data) {
          await getArticleCategories(data);
        }

        blah(res.data)

      })
      .catch(err => console.log(err));
  }
  
  const [related, setRelated] = useState([]);

  useEffect(() => {
    getArticleCategories()
  }, [idString])

  function getArticleCategories(art) {
    console.log(art);
    if(art) {
      art.category.forEach(cat => {
        api.getArticleCat(cat)
          .then(res => {
            console.log(res.data);
            setRelated(related.concat(res.data));
          })
      });
    }
  }

  if(article)
  {
    let date = article.date.split('T');
    return (
      <div>
        <Tile kind="ancestor">
          <Tile size={9} vertical>
            <Tile>
              <Tile kind="parent">
                <Tile renderAs="article" kind="child">
                  <Container>
                    <Hero style={{textAlign: 'center'}} color={colors.light}>
                      <Hero.Body>
                        <Heading>

                          {article.title}
                        </Heading>
                      </Hero.Body>
                    </Hero>
                    <Image src={article.image} />
                    <Box>

                      <Navbar color={colors.light}>
                        <Navbar.Container>
                          <Navbar.Item> 
                            Categories: {
                              article.category.map((category, index) => (
                                <Link to='/' key={index}> {category}</Link>
                              ))
                            }
                          </Navbar.Item>
                          <Navbar.Item>
                            Published: {date[0]}
                          </Navbar.Item>
                          <Navbar.Item>
                            Latitued: {article.lat}
                          </Navbar.Item>
                          <Navbar.Item>
                            Longitude: {article.long}
                          </Navbar.Item>
                        </Navbar.Container>
                      </Navbar>
                      {article.body}
                    </Box>
                  </Container>
                </Tile>
              </Tile>
              
            </Tile>
            <Tile kind="parent">
              <Tile renderAs="article" kind="child">
                <Container>
                  <Box>
                    <Heading subtitle>Comments</Heading>
                    <div className="content" />
                  </Box>
                </Container>
              </Tile>
            </Tile>
          </Tile>
          <Tile kind="parent">
            <Tile renderAs="article" kind="child" >
              <Container>
                <Box>
                  <div className="content">
                    <Heading subtitle>Related</Heading>

                    { related &&
                      related.map((relate, index) => (
                        relate._id !== article._id &&
                        <ArticlePreview article={relate} key={index}/>
                      ))
                    }

                    <div className="content" />
                  </div>
                </Box>
              </Container>
            </Tile>
          </Tile>
        </Tile>

      </div>
    );
  }
  return (
    <div>
      
      <p>ArticleDetailView</p>
    </div>
  );
  
}
export default ArticleDetailView;

const colors = {
  Default: '',
  primary: 'primary',
  info: 'info',
  danger: 'danger',
  warning: 'warning',
  success: 'success',
  white: 'white',
  black: 'black',
  light: 'light',
  dark: 'dark',
  link: 'link',
};