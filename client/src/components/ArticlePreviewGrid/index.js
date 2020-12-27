import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../../utils/api'
import { Link } from 'react-router-dom';
import Date from '../Date';

import {Tile, Heading, Box, Media} from 'react-bulma-components';
import './style.css';

function ArticlePreviewGrid({article}){

  const [user, setUser] = useState();
  useEffect( ()=> {
    loadUser(article.user)
  }, []);

  function loadUser(userId) {
    api.getUser(userId)
      .then(res => setUser(res.data))
      .catch(err => console.log(err));
  }

  return(
    <Tile  kind="parent">
     
      <Tile className="relatedArticleTile" kind="child">
        <Box paddingless={Boolean('paddingless', true)}>
          <Media>
            <Media.Item renderAs="figure" className="is-marginless">
              <figure className="image relatedImg is-marginless">
                <img src={article.image} alt="128x128"/>
              </figure>
            </Media.Item>
          </Media>
          <Link to={`/article/${article._id}`}>
            <Heading size={6} className='mb-3'>{article.title}</Heading>
          </Link>
          <Heading subtitle size={7} renderAs="h2">By: {user ? user.name: 'Anonymous'} <Date date={article.date} /></Heading>
        
        </Box>
      </Tile>
    </Tile>
  

  )
}

ArticlePreviewGrid.propTypes = {
  article: PropTypes.object
};

export default ArticlePreviewGrid;