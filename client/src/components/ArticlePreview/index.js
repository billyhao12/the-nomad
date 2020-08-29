/* eslint-disable react/prop-types */
import React from 'react';
import Card from 'react-bootstrap/Card';

import './style.css';

function ArticlePreview({article}) {

  return (
    <Card>
      <Card.Img class="articleImages" variant="top" src={article.image} />
      <Card.Body>
        <Card.Title>{article.title}</Card.Title>
        <Card.Text>
          Article Summary
        </Card.Text>
      </Card.Body>
    </Card>
  );

}

export default ArticlePreview;
