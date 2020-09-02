import React, {/*useState,*/ Component} from 'react';

import api from '../utils/api';
import {Redirect} from 'react-router';
import {withRouter} from 'react-router-dom';
// example image url that is free and won't cause an error linking to it: https://images.unsplash.com/photo-1598143167992-f211e206b2d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80

import {Form,  Button, Container, Jumbotron, Image, Navbar} from 'react-bootstrap';
import ArticleDetailView from './ArticleDetailView';

class ArticleCreate extends Component {


  state = {
    articleTitle: '',
    categories: [],
    articleBody: '',
    image: '',
    created: false,
    newArticleId: '',
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(event);

    // awaiting proper API push to create article. Receive _ID and then link to the new article.

    console.log(`Title: ${this.state.articleTitle}`);
    console.log(`Image: ${this.state.image}`);
    console.log(`Categories: ${this.state.categories}`);
    console.log(`Body: ${this.state.articleBody}`);

    api.createArticle({title: this.state.articleTitle, category: this.state.categories, body: this.state.articleBody, image: this.state.image})
      .then(res =>
        this.setState({newArticleId: res.data._id}, () => {
          this.setState({created: true}, () => {
            console.log(`Success! ${res.data._id}, ${this.state.newArticleId}`)}
          )
        })
      )
      .catch(err => console.log(err));
  }

  handleInputChange = event => {
    const id = event.target.id;
    const value = event.target.value;

    console.log(event.target.id);
    console.log(`value: ${event.target.value}`);

    if(id === 'title') {
      this.setState({articleTitle: value}, () => console.log(`Article Title: ${this.state.articleTitle}`));
    } else if(id === 'image') {
      this.setState({image: value}, () => console.log(`Image URL: ${this.state.image}`));
    } else {
      this.setState({articleBody: value}, () => console.log(`Body: ${this.state.articleBody}`));
    }
  }

  handleSelectChange = event => {
    const value = event.target.value;
    const checked = event.target.checked;

    console.log(event);
    console.log(event.target);
    console.log(event.target.value);
    console.log(event.target.checked);

    if(checked === true) {
      if(!this.state.categories.includes(`${value}`)) { // if this.state.categories doesn't contain the clicked category
        const newCategories = this.state.categories.concat(`${value}`); // new array (can't push or pop the state directly)
        this.setState({categories: newCategories}, () => console.log('added to categories: ' + this.state.categories)); // assign the new array to state
      } else {
        return;
      }
    } else { //same as above but opposite for removing values from the categories array
      if(this.state.categories.includes(`${value}`)) {
        let newCategores = this.state.categories.filter(category => category !== value);
        this.setState({categories: newCategores}, () => console.log('removed from categories: ' + this.state.categories))
      } else {
        return;
      }
    }
  }

  render() {
    
    if(this.state.created) {
      console.log(`created: ${this.state.created}, articleId: ${this.state.newArticleId}`);
      return <Redirect to={`/article/${this.state.newArticleId}`} component={ArticleDetailView}/>
    }

    return(
      <div>
        <Container>
          <Form onSubmit={this.handleFormSubmit}>
            <Form.Group controlId="title" onChange={this.handleInputChange}>
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter Article Title" />
            </Form.Group>

            <Form.Group controlId="image" onChange={this.handleInputChange}>
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter Image URL" />
            </Form.Group>

            <Form.Group controlId="category">
              {
                categoriesList.map((category, index) => (
                  <Form.Check
                    type='checkbox'
                    label={`${category}`}
                    value={`${category}`}
                    key={index}
                    onChange={this.handleSelectChange}
                  />
                ))
              }
            </Form.Group>

            <Form.Group controlId="body" onChange={this.handleInputChange}>
              <Form.Label>Article Body</Form.Label>
              <Form.Control as="textarea" rows="3" />
            </Form.Group>

            <Button variant="dark" type="submit">
              Submit Article
            </Button>
          </Form>
        </Container>

        <Container className='mt-5'>
          <Container>
            <Jumbotron>
              <h1 style={{textAlign: 'center'}}>Article Preview</h1>
              <h1>(Title:) {this.state.articleTitle}</h1>
              <Image src={this.state.image} rounded />
              <Navbar bg="light">(Details)    Category: {this.state.categories} Publication date: lat: lon: </Navbar>
              <p><br></br><br></br>(Body:) {this.state.articleBody}</p>
            </Jumbotron>
          </Container>
        </Container>
      </div>

    );
  }
}

const categoriesList = [
  'Food',
  'Sports',
  'Travel',
  'Tech/Science',
  'Politics',
  'Entertainment',
  'Location'
];

export default withRouter(ArticleCreate);