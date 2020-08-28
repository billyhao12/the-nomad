import React from 'react';
import Col from 'react-bootstrap/Col';
import './style.css';

function Categories() {

  return (
    <Col md={3}>
      <h1>Categories</h1>
      <ul>
        <li><a href="#">Food</a></li>
        <li><a href="#">Sports</a></li>
        <li><a href="#">Travel</a></li>
        <li><a href="#">Tech/Science</a></li>
        <li><a href="#">Politics</a></li>
        <li><a href="#">Entertainment</a></li>
        <li><a href="#">Location</a></li>
      </ul>
    </Col>
  );

}

export default Categories;
