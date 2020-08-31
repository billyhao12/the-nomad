import React, {useState, Component} from 'react';

import api from '../utils/api';

import {Form, Button, Container} from 'react-bootstrap';

class ArticleCreate extends Component {



  render() {
    
    return(
      <p>article create</p>


    );
  }
}

const categoriesList = [
  {
    label:'Food',
    state: {checkboxChecked: false}
  },
  {
    label:'Sports',
    state: {checkboxChecked: false}
  },
  {
    label:'Travel',
    state: {checkboxChecked: false}
  },
  {
    label:'Tech/Science',
    state: {checkboxChecked: false}
  },
  {
    label:'Politics',
    state: {checkboxChecked: false}
  },
  {
    label:'Entertainment',
    state: {checkboxChecked: false}
  },
  {
    label:'Location',
    state: {checkboxChecked: false}
  }
];

export default ArticleCreate;