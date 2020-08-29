import React from 'react';
import {Link} from 'react-router-dom';
import Card from 'react-bootstrap/Card';

function ArticlePreview(props) {
  return (
    <Card>
      <Card.Img src={props.article.image} className="card-img-top" alt="..."></Card.Img>
      <Card.Title><Link to={`/article/${props.article._id}`}>{props.article.title}</Link></Card.Title>
      {/** <Card.Subtitle className="mb-2 text-muted">Authored by: <a href='#'>{article.author}</a></Card.Subtitle>**/}
    </Card>
  );
}

export default ArticlePreview;