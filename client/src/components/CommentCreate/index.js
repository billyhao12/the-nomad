import React, {useState, useEffect} from 'react';
import propTypes from 'prop-types';
import {Box, Container, Form, Button} from 'react-bulma-components';
import api from '../../utils/api';

function CommentCreate(props) {

  const [comment, setComment] = useState();

  useEffect(() => {

  },[])

  function handleInputChange(e) {
    const value = e.target.value;

    console.log(value);

    setComment(value);
  }

  function handleFormSubmit(e) {
    console.log(e);

    api.createComment({content: comment, article: props.articleId})
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  return (
    <Container>
      <Box>
        <Form.Field>
          <Form.Label>Comment</Form.Label>
          <Form.Control>
            <Form.Textarea placeholder="Enter your comment" onChange={handleInputChange} value={comment}/>
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Control>
            <Button type='primary' onClick={handleFormSubmit}>Submit</Button>
          </Form.Control>
        </Form.Field>
      </Box>
    </Container>
  );
}

CommentCreate.propTypes= {
  articleId: propTypes.string,
}

export default CommentCreate;