import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { 
  Section, 
  Box,
  Media,
  Image, 
  Content,
  Button,
  Level,
  Heading } from 'react-bulma-components';

import './style.css';

function ArticlePreview({article}) {

  return (
    <Section>
      <Box>
        <Link to={`/article/${article._id}`}>
          <Heading className='mb-3'>{article.title}</Heading>
        </Link>
        <Media>
          <Media.Item renderAs="figure" position="left">
            <Image size={128} alt="128x128" src={article.image} />
          </Media.Item>
          <Media.Item>
            <Content>
              <p>
                <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
                <br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
              </p>
            </Content>
            <Level breakpoint="mobile">
              <Level.Side align="left">
                <Button link className='mr-2'>
                  <FontAwesomeIcon icon="arrow-up" />
                </Button>
                <p>net upvotes</p>
                <Button link className='ml-2'>
                  <FontAwesomeIcon icon="arrow-down" />
                </Button>
              </Level.Side>
            </Level>
          </Media.Item>
        </Media>
      </Box>
    </Section>
  )

}

ArticlePreview.propTypes = {
  article: PropTypes.array
};

export default ArticlePreview;
