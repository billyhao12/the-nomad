import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import api from '../../utils/api';

import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { 
  Card, 
  Box,
  Media,
  Tile, 
  Content,
  // Button,
  Level,
  Heading } from 'react-bulma-components';

import './style.css';

function ArticlePreview({article}) {

  const [user, setUser] = useState();

  useEffect(() => {
    loadUser(article.user)
  }, []);

  function loadUser(userId) {
    api.getUser(userId)
      .then(res => setUser(res.data))
      .catch(err => console.log(err));
  }

  return (
    <Tile kind="parent">
      <Tile >
        <Box>
          <Media>
            <Media.Item  renderAs="figure" position="left">
              {/* <Image className="articlePreviewImg" style={{maxWidth: '128px', maxHeight: '128px', objectFit: 'contain'}} size={128} alt="128x128" src={article.image} /> */}
              <figure className="image articlePreviewImg">
                <img  src={article.image} alt="128x128" />
              </figure>
            </Media.Item>
            <Media.Item>
              <Level breakpoint="mobile">
                <Level.Side align="left">
                  {/* <Button className='mr-2'>
                  <FontAwesomeIcon icon="arrow-up" />
                </Button>
                <p>net upvotes</p>
                <Button className='ml-2'>
                  <FontAwesomeIcon icon="arrow-down" />
                </Button> */}
                </Level.Side>
              </Level>
            </Media.Item>
          </Media>
          <Link to={`/article/${article._id}`}>
            <Heading size={4} className='mb-3'>{article.title}</Heading>
          </Link>
          <Content>
            <p>
              <strong>{user ? user.name : 'NA'}</strong> <small>{article.date}</small>
              <br />
              {/* {article.byline} */}
            </p>
          </Content>
        </Box>
      </Tile>
    </Tile>
  )
}

ArticlePreview.propTypes = {
  article: PropTypes.object
};

export default ArticlePreview;
