import React, { /*useState,*/ Component } from 'react';

import api from '../utils/api';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';

// example image url that is free and won't cause an error linking to it: https://images.unsplash.com/photo-1598143167992-f211e206b2d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80
import {
  Form,
  Button,
  Container,
  Box,
  Hero,
  Image,
  Heading,
  Section,
  Level,
  Content,
  Dropdown
} from 'react-bulma-components';
import PropTypes from 'prop-types';
import ArticleDetailView from './ArticleDetailView';
const QueryString = require('querystring')

class ArticleCreate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      articleTitle: '',
      categories: [],
      articleBody: '',
      image: '',
      byLine: '',
      created: false,
      newArticleId: '',
      checkin: QueryString.parse(props.match.params.checkin)
    };
  }
  handleFormSubmit = event => {
    event.preventDefault();
    console.log(event);

    // awaiting proper API push to create article. Receive _ID and then link to the new article.

    console.log(`Title: ${this.state.articleTitle}`);
    console.log(`Image: ${this.state.image}`);
    console.log(`Categories: ${this.state.categories}`);
    console.log(`Body: ${this.state.articleBody}`);

    api.createArticle({title: this.state.articleTitle, byline: this.state.byLine, category: this.state.categories, body: this.state.articleBody, image: this.state.image, lat:this.state.checkin.lat, long:this.state.checkin.long, date:this.state.checkin.date})
      .then(res =>
        this.setState({newArticleId: res.data._id}, () => {
          this.setState({created: true}, () => {
            console.log(`Success! ${res.data._id}, ${this.state.newArticleId}`)}
          )
        })
      )
      .catch((err) => console.log(err));
  };

  handleInputChange = (event) => {
    const id = event.target.name;
    const value = event.target.value;

    console.log(event.target.id);
    console.log(`value: ${event.target.value}`);

    if (id === 'title') {
      this.setState({ articleTitle: value }, () =>
        console.log(`Article Title: ${this.state.articleTitle}`)
      );
    } else if (id === 'image') {
      this.setState({ image: value }, () =>
        console.log(`Image URL: ${this.state.image}`)
      );
    } else if (id === 'byline') {
      this.setState({ byLine: value }, () =>
        console.log(`Byline: ${this.state.byLine}`)
      );
    } else {
      this.setState({ articleBody: value }, () =>
        console.log(`Body: ${this.state.articleBody}`)
      );
    }
  };

  handleSelectChange = (event) => {
    const value = event.target.value;
    const checked = event.target.checked;

    console.log(event);
    console.log(event.target);
    console.log(event.target.value);
    console.log(event.target.checked);

    if (checked === true) {
      if (!this.state.categories.includes(`${value}`)) {
        // if this.state.categories doesn't contain the clicked category
        const newCategories = this.state.categories.concat(`${value}`); // new array (can't push or pop the state directly)
        this.setState({ categories: newCategories }, () =>
          console.log('added to categories: ' + this.state.categories)
        ); // assign the new array to state
      } else {
        return;
      }
    } else {
      //same as above but opposite for removing values from the categories array
      if (this.state.categories.includes(`${value}`)) {
        let newCategores = this.state.categories.filter(
          (category) => category !== value
        );
        this.setState({ categories: newCategores }, () =>
          console.log('removed from categories: ' + this.state.categories)
        );
      } else {
        return;
      }
    }
  };

  render() {
    if (this.state.created) {
      console.log(
        `created: ${this.state.created}, articleId: ${this.state.newArticleId}`
      );
      return (
        <Redirect
          to={`/article/${this.state.newArticleId}`}
          component={ArticleDetailView}
        />
      );
    }

    return (
      <div>
        <Container>
          <Box>
            <Section>
              <Hero color='light' className='has-text-centered'>
                <Heading size={2}>Create A New Article</Heading>
              </Hero>
            </Section>

            <Form.Field>
              <Form.Label>Title</Form.Label>
              <Form.Control>
                <Form.Input
                  type={'text'}
                  placeholder={'Enter Article Title'}
                  name='title'
                  onChange={this.handleInputChange}
                  value={this.state.articleTitle}
                />
              </Form.Control>
            </Form.Field>

            <Form.Field>
              <Form.Label>Image</Form.Label>
              <Form.Control>
                <Form.Input
                  type={'text'}
                  placeholder={'Enter Image URL'}
                  name='image'
                  onChange={this.handleInputChange}
                  value={this.state.image}
                />
              </Form.Control>
            </Form.Field>

            <Form.Field>
              <Form.Label>Byline</Form.Label>
              <Form.Control>
                <Form.Input
                  type={'text'}
                  placeholder={'Enter Article Byline'}
                  name='byline'
                  onChange={this.handleInputChange}
                  value={this.state.byLine}
                />
              </Form.Control>
            </Form.Field>

            <Form.Field>
              <Form.Label>Categories</Form.Label>

              <Form.Control name='category'>
                {categoriesList.map((category, index) => (
                  <div key={index}>
                    <Form.Checkbox
                      key={index}
                      value={`${category}`}
                      onChange={this.handleSelectChange}
                    >
                      {' ' + category}
                    </Form.Checkbox>
                  </div>
                ))}
              </Form.Control>
            </Form.Field>

            <Form.Field>
              <Form.Label>Article Body</Form.Label>
              <Form.Control>
                <Form.Textarea
                  name='body'
                  onChange={this.handleInputChange}
                  placeholder='Enter Article Body Here'
                  value={this.state.articleBody}
                />
              </Form.Control>
            </Form.Field>

            <Form.Field>
              <Form.Label>Article Radius</Form.Label>
              <Form.Control>
                <Dropdown  >
                  <Dropdown.Item value='item'>1 Mile</Dropdown.Item>
                  <Dropdown.Item value='other'>5 Miles</Dropdown.Item>
                  <Dropdown.Item value='active'>25 Miles</Dropdown.Item>
                  <Dropdown.Item value='other 2'>50 Miles</Dropdown.Item>
                </Dropdown>
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Control>
                <Button type='light' onClick={this.handleFormSubmit}>
                  Submit
                </Button>
              </Form.Control>
            </Form.Field>
          </Box>

          <Box>
            <Container>
              <Hero className='has-text-centered' color='light'>
                <Hero.Body>
                  <Heading>{this.state.articleTitle}</Heading>
                </Hero.Body>
              </Hero>
              <Image src={this.state.image} />
              <Box>
                <Box>
                  <Level renderAs='nav'>
                    <Level.Side align='left'>
                      <Level.Item>
                        <Heading size={5} subtitle>
                          Categories:
                        </Heading>
                      </Level.Item>

                      {this.state.categories.map((category, index) => (
                        <Level.Item renderAs='button' key={index}>
                          {category}
                        </Level.Item>
                      ))}
                    </Level.Side>

                    <Level.Side align="right">
                      <Level.Item><Heading size={5} subtitle><strong>Published: {this.state.checkin.date}</strong></Heading></Level.Item>
                      <Level.Item><Heading size={5} subtitle><strong>Lat: {this.state.checkin.lat}</strong></Heading></Level.Item>
                      <Level.Item><Heading size={5} subtitle><strong>Long: {this.state.checkin.long} </strong></Heading></Level.Item>
                    </Level.Side>
                  </Level>
                </Box>
                <Content>{this.state.articleBody}</Content>
              </Box>
            </Container>
          </Box>
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
  'Location',
];
ArticleCreate.propTypes = {
  match: PropTypes.object
}
export default withRouter(ArticleCreate);
