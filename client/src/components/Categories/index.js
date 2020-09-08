import React from 'react';

import { Section, Box, Heading } from 'react-bulma-components';

import './style.css';

function Categories() {

  return (
    <Section>
      <Box>
        <Heading>Categories</Heading>
        <ul>
          <li><a href="/">Food</a></li>
          <li><a href="/">Sports</a></li>
          <li><a href="/">Travel</a></li>
          <li><a href="/">Tech/Science</a></li>
          <li><a href="/">Politics</a></li>
          <li><a href="/">Entertainment</a></li>
          <li><a href="/">Location</a></li>
        </ul>
      </Box>
    </Section>
  );

}

export default Categories;
