import React, { useEffect, useState, Component} from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import ReactMapboxGl, {Layer} from 'react-mapbox-gl';
import {Feature} from 'react-mapbox-gl';
import api from '../utils/api';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Image from 'react-bootstrap/Image';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class ArticleCreate extends Component {

  state = {

  };

  handleFormSubmit = event => {
    event.preventDefault();
    
  }

  render() {
    return (
      <Container>
        <Form>
          <Form.Group controlId="ArticleDetails">
            <Form.Label>Article Title</Form.Label>
            <Form.Control type="text" placeholder="Enter a title" />
            
            <Form.Label>Article Image</Form.Label>
            <Form.Control type="text" placeholder="Enter an image url" />

            <Form.Label>Categories</Form.Label>
            <Form.Control as="select" multiple>
              <option>Food</option>
              <option>Sports</option>
              <option>Travel</option>
              <option>Tech/Science</option>
              <option>Politics</option>
              <option>Entertainment</option>
              <option>Location</option>
            </Form.Control>

          </Form.Group>

          <Form.Group controlId="ArticleBody">
            <Form.Label>Article Body</Form.Label>
            <Form.Control as="textarea" rows="20" />
          </Form.Group>

          <Button variant="primary" type="submit">
          Submit Article
          </Button>
        </Form>
      </Container>
    );
  }
}

export default ArticleCreate;