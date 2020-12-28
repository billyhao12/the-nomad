import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../../utils/api';
import { Link } from 'react-router-dom';
import Date from '../Date';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { 
  Section, 
  Box,
  Media,
  // Image, 
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
    <Section>
      <Box>
        <Link to={`/article/${article._id}`}>
          <Heading className='mb-3'>{article.title}</Heading>
        </Link>
        <Media>
          <Media.Item  renderAs="figure" position="left">
            {/* <Image className="articlePreviewImg" style={{maxWidth: '128px', maxHeight: '128px', objectFit: 'contain'}} size={128} alt="128x128" src={article.image} /> */}
            <figure className="image is-128x128">
              <img className="articlePreviewImg" src={article.image} alt="128x128" />
            </figure>
          </Media.Item>
          <Media.Item>
            <Content>
              <p>
                <strong>{user ? user.name : 'NA'}</strong> <small><Date date={article.date} /></small>
                <br />
                {article.byline}
              </p>
            </Content>
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
      </Box>
    </Section>
  )
}

ArticlePreview.propTypes = {
  article: PropTypes.object
};

export default ArticlePreview;
