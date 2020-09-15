import React from 'react';
import propTypes from 'prop-types';

import api from '../../utils/api';

import { Section, Box, Heading } from 'react-bulma-components';

import './style.css';

function Categories({ setArticles }) {

  function handleClick(e) {
    api.getArticleCategoriesSingle(e.target.text)
      .then(result => {
        setArticles(result.data.map( item => ({
          title: item.title,
          image: item.image,
          byline: item.byline,
          category: item.category,
          date: item.date,
          like: item.like,
          dislike: item.dislike,
          lat: item.lat,
          long: item.long,
          user: item.user,
          _id: item._id
        })));
      })
      .catch(err => console.log(err));
  }

  return (
    <Section>
      <Box>
        <Heading>Categories</Heading>
        <ul>
          <li><a onClick={handleClick}>Food</a></li>
          <li><a onClick={handleClick}>Sports</a></li>
          <li><a onClick={handleClick}>Travel</a></li>
          <li><a onClick={handleClick}>Technology</a></li>
          <li><a onClick={handleClick}>Science</a></li>
          <li><a onClick={handleClick}>Politics</a></li>
          <li><a onClick={handleClick}>Entertainment</a></li>
        </ul>
      </Box>
    </Section>
  );

}

Categories.propTypes = {
  setArticles: propTypes.func
}

export default Categories;
