/* eslint-disable react/prop-types */
import React from 'react';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';

import './style.css';

function ArticlePreview({article}) {

  return (
    <Link className="customCard" to={`/article/${article._id}`}>
      <Card>
        <Card.Img className="articleImages" variant="top" src={article.image} />
        <Card.Body>
          <Card.Title>{article.title}</Card.Title>
          <Card.Text>
            Article Summary
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );

}

export default ArticlePreview;