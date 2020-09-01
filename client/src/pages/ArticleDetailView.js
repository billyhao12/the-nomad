import React, { useEffect, useState} from 'react';

// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
// import ListGroup from 'react-bootstrap/ListGroup';
// import Card from 'react-bootstrap/Card';
// import ReactMapboxGl, {Layer} from 'react-mapbox-gl';
// import {Feature} from 'react-mapbox-gl';
import api from '../utils/api';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Image from 'react-bootstrap/Image';
import Navbar from 'react-bootstrap/Navbar';
import PropTypes from 'prop-types';

ArticleDetailView.propTypes = {
  location: PropTypes.object,
  pathname: PropTypes.string,
}

function ArticleDetailView(props) {
  console.log(props);
  const pathname = props.location.pathname;

  const articleid = pathname.split('/');

  const idString = articleid[2];

  console.log(pathname);
  console.log(idString);

  const [article, setArticle] = useState([]);

  useEffect(() => {
    loadArticle(idString)
  }, [])

  function loadArticle(id) {
    api.getArticle(id)
      .then(res =>
        setArticle(res.data)
      )
      .catch(err => console.log(err));
  }

  console.log('article: ' + article);

  return (
    <Container>
      <Jumbotron>
        <h1>{article.title}</h1>
        <Image src={article.image} rounded />
        <Navbar bg="light">Category: {article.category} Publication date: {article.date} lat: {article.lat} lon: {article.long} </Navbar>
        <p><br></br><br></br>{article.body}</p>
      </Jumbotron>
    </Container>
  );
}

export default ArticleDetailView;